const mongoose = require('mongoose');
const QuestSchema = new mongoose.Schema({
  idQr: mongoose.Schema.Types.ObjectId,
  creator_id: String,
  name: String,
  question: String,
  answer: String,
  location: [Number],
  date_created: Date,
  date_expires: Date
});

module.exports = QuestSchema;