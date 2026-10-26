const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  id: { type: Number },
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctIndex: { type: Number, required: true },
  explanation: { type: String }
});

const MockTestSchema = new mongoose.Schema({
  testId: { type: String, required: true, unique: true },
  jobId: { type: String },
  exam: { type: String, required: true },
  title: { type: String, required: true },
  category: { type: String, default: 'General' },
  durationMinutes: { type: Number, default: 60 },
  totalQuestions: { type: Number, default: 25 },
  questions: [QuestionSchema]
}, { timestamps: true });

module.exports = mongoose.model('MockTest', MockTestSchema);
