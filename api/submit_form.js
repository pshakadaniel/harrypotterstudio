const mongoose = require("mongoose");

let isConnected = false;

// MongoDB connection function
const connectMongo = async () => {
  if (!isConnected) {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      isConnected = true;
      console.log("Connected to MongoDB Atlas");
    } catch (error) {
      console.error("Failed to connect to MongoDB:", error);
      throw error;
    }
  }
};

// API handler
module.exports = async (req, res) => {
  if (req.method === "POST") {
    try {
      // Connect to MongoDB
      await connectMongo();

      // Extract form data from request body
      const { name, email, subject, message } = req.body;

      // Define Mongoose Schema and Model
      const Message = mongoose.model(
        "Message",
        new mongoose.Schema({
          name: { type: String, required: true },
          email: { type: String, required: true },
          subject: { type: String, required: true },
          message: { type: String, required: true },
          date: { type: Date, default: Date.now },
        })
      );

      // Save the form data to MongoDB
      const newMessage = new Message({ name, email, subject, message });
      await newMessage.save();

      // Send success response
      res.status(200).json({
        success: true,
        message: "Your message has been submitted successfully!",
      });
    } catch (error) {
      console.error("Error saving to database:", error);
      res.status(500).json({
        success: false,
        error: "Internal Server Error",
      });
    }
  } else {
    res.status(405).json({
      success: false,
      message: "Method Not Allowed",
    });
  }
};
