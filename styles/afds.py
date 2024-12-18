from flask import Flask, request, jsonify
import pickle
import pandas as pd
from scipy.sparse import csr_matrix
from sklearn.metrics.pairwise import cosine_similarity

# Initialize Flask app
app = Flask(__name__)

# Load Pickle Model
with open('./recsys.pkl', 'rb') as file:
    data = pickle.load(file)

# Unpack data
interaction_matrix = data['interaction_matrix']
user_avg_price = data['user_avg_price']
user_interactions = data['user_interactions']
item_df = data['item_df']

# Interaction weights
interaction_weights = {'view': 1, 'like': 2, 'bid': 4, 'buy': 5}

# Recommendation function
def recommend_items(target_user, threshold=1.5):
    """Recommend items to a user dynamically."""
    # Step 1: Compute cosine similarity
    sparse_matrix = interaction_matrix
    target_index = interaction_matrix.index.get_loc(target_user)
    target_vector = sparse_matrix[target_index]
    user_similarities = cosine_similarity(target_vector, sparse_matrix).flatten()

    # Get top similar users
    similar_users = pd.Series(user_similarities, index=interaction_matrix.index).drop(target_user)
    similar_users = similar_users[similar_users > 0].sort_values(ascending=False).head(5)

    # Step 2: Calculate item scores
    item_scores = {}
    for user in similar_users.index:
        user_items = user_interactions[user_interactions['userID'] == user]
        for item, group in user_items.groupby('itemID'):
            cumulative_score = sum(interaction_weights.get(action, 0) for action in group['action'])
            item_scores[item] = item_scores.get(item, 0) + cumulative_score

    # Step 3: Exclude items user already interacted with
    user_history = user_interactions[
        (user_interactions['userID'] == target_user) &
        (user_interactions['action'].isin(['view', 'like', 'bid', 'buy', 'uninterested']))
    ]['itemID'].unique()
    item_scores = {item: score for item, score in item_scores.items() if item not in user_history}

    # Step 4: Filter by price range
    target_avg_price = user_avg_price.loc[user_avg_price['userID'] == target_user, 'avg_price_range'].values[0]
    filtered_items = item_df[item_df['itemID'].isin(item_scores.keys())]
    filtered_items = filtered_items[filtered_items['start_price'] <= target_avg_price * threshold]
    filtered_items['weighted_score'] = filtered_items['itemID'].map(item_scores)

    # Return top 10 items
    return filtered_items.sort_values(by='weighted_score', ascending=False).head(10)

# API Endpoint
@app.route('/recommendations', methods=['GET'])
def get_recommendations():
    target_user = request.args.get('userID')  # Example: /recommendations?userID=U00001
    if target_user not in interaction_matrix.index:
        return jsonify({"error": "User ID not found!"}), 404
    
    recommendations = recommend_items(target_user)
    return jsonify(recommendations.to_dict(orient='records'))

# Run Flask Server
if __name__ == '__main__':
    app.run(debug=True)
