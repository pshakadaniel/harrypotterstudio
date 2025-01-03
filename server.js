const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: true }));

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

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "contact.html"));
});

app.post("/api/submit_form", (req, res) => {
  const { name, email, subject, message } = req.body;
  const newForm = new Form({ name, email, subject, message });

  newForm.save((err) => {
    if (err) {
      res.status(500).send("Error saving form data.");
    } else {
      res.send("Form submitted successfully!");
    }
  });
});
