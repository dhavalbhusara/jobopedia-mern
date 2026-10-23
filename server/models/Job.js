const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  department: { type: String, required: true },
  category: { type: String, enum: ['govt', 'private', 'internship'], default: 'govt' },
  sector: { type: String, default: 'GOVERNMENT' },
  state: { type: String, required: true },
  qualification: { type: String, default: 'Graduate' },
  salary: { type: String, required: true },
  vacancies: { type: Number, default: 1 },
  lastDate: { type: String, default: '2026-12-31' },
  dayNumber: { type: Number, default: 1 }, // 1 to 7 for weekly calendar
  description: { type: String, required: true },
  eligibility: { type: String, default: 'Any Graduate / Relevant Degree' },
  applyUrl: { type: String, default: 'https://jobopedia.in' },
  tags: [{ type: String }],
  isNewJob: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Job', JobSchema);
