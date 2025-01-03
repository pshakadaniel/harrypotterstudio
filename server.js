const express = require("express");
const cors = require("cors"); // Import the CORS middleware
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();

const app = express();

// Enable CORS for your frontend domain
app.use(
  cors({
    origin: "https://harrypotterstudio.vercel.app/", // Replace with your actual frontend URL
    methods: ["GET", "POST"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type"], // Allowed headers
  })
);

// Parse URL-encoded data and JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a schema and model for the form data
const formSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
});

const Form = mongoose.model("Form", formSchema);

// Serve the contact page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "contact.html"));
});

// Handle form submissions
app.post("/api/submit_form", (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const newForm = new Form({ name, email, subject, message });

  newForm.save((err) => {
    if (err) {
      console.error("Error saving form data:", err);
      return res.status(500).json({ error: "Error saving form data." });
    } else {
      console.log("Form submitted:", req.body);
      return res.status(200).json({ message: "Form submitted successfully!" });
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
