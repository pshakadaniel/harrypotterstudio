const mongoose = require("mongoose");

// MongoDB Connection
let isConnected = false;

const connectMongo = async () => {
  if (!isConnected) {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
  }
};

module.exports = async (req, res) => {
  if (req.method === "POST") {
    try {
      await connectMongo();
      const { name, email, subject, message } = req.body;
      const Message = mongoose.model(
        "Message",
        new mongoose.Schema({
          name: String,
          email: String,
          subject: String,
          message: String,
        })
      );

      const newMessage = new Message({ name, email, subject, message });
      await newMessage.save();

      res.status(200).json({ success: true, message: "Message saved!" });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
};
