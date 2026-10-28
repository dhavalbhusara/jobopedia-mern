const mongoose = require('mongoose');

function slugify(text) {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\(\)\[\]\{\}\/\\,.:;!?'"]/g, '') // remove special punctuation
    .replace(/\s+/g, '-')                      // replace spaces with -
    .replace(/[^\w\-]+/g, '')                  // remove remaining non-word chars
    .replace(/\-\-+/g, '-')                    // replace multiple - with single -
    .replace(/^-+/, '')                        // trim - from start
    .replace(/-+$/, '');                       // trim - from end
}

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, index: true },
  department: { type: String, required: true },
  category: { type: String, enum: ['govt', 'private', 'internship'], default: 'govt' },
  sector: { type: String, default: 'GOVERNMENT' },
  state: { type: String, required: true },
  states: [{ type: String }],
  qualification: { type: String, default: 'Graduate' },
  qualifications: [{ type: String }],
  salary: { type: String, required: true },
  vacancies: { type: Number, default: 1 },
  lastDate: { type: String, default: '2026-12-31' },
  dayNumber: { type: Number, default: 1 }, // 1 to 7 for weekly calendar
  ageLimit: { type: String, default: '18 - 35 Years' },
  selectionProcess: { type: String, default: 'Online Computer Based Test (CBT) & Document Verification' },
  description: { type: String, required: true },
  eligibility: { type: String, default: 'Any Graduate / Relevant Degree' },
  applyUrl: { type: String, default: 'https://jobopedia.in' },
  notificationUrl: { type: String },
  hasMcqs: { type: Boolean, default: false },
  mcqTestId: { type: String },
  tags: [{ type: String }],
  isNewJob: { type: Boolean, default: true }
}, { timestamps: true });

JobSchema.pre('save', function(next) {
  if (!this.slug && this.title) {
    this.slug = slugify(this.title);
  }
  next();
});

module.exports = mongoose.model('Job', JobSchema);
module.exports.slugify = slugify;
