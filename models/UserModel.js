const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
    index: true,
  },
  notes: [{ title: String, content: String }],
});

module.exports = mongoose.model("User", userSchema);
