const mongoose = require("../db/db");
const schema = mongoose.Schema;
const user = new schema({
  email: String,
  username: String,
  password: String,
  numOfQuiz: Number,
  scores: [Number],
  categories: [String],
});

module.exports = mongoose.model("user", user);
