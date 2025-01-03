const express = require("express");
const cors = require("cors"); // Import the CORS middleware
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();

const app = express();

// Parse URL-encoded data and JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

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
app.post("/api/submit_form", async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validate form data
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const newForm = new Form({ name, email, subject, message });
    await newForm.save();
    console.log("Form submitted:", req.body);
    return res.status(200).json({ message: "Form submitted successfully!" });
  } catch (err) {
    console.error("Error saving form data:", err);
    return res.status(500).json({ error: "Error saving form data." });
  }
});

// Fallback for other routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start the server
const PORT = process.env.PORT || 3000; // Use Vercel's PORT environment variable
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
