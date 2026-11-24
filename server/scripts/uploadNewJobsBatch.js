const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const Job = require('../models/Job');
const NEW_JOBS = require('./newJobsBatch.json');

async function uploadBatch() {
  console.log('Connecting to MongoDB Atlas...');
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected successfully!');

  let addedCount = 0;
  let skippedCount = 0;

  for (const jobData of NEW_JOBS) {
    // Check if exact title already exists
    const existing = await Job.findOne({ title: jobData.title });

    if (existing) {
      console.log(`[SKIP] Already exists: "${existing.title}" (ID: ${existing._id})`);
      skippedCount++;
    } else {
      const created = await Job.create(jobData);
      console.log(`[ADD] Successfully created: "${created.title}" (ID: ${created._id})`);
      addedCount++;
    }
  }

  console.log(`\n========================================`);
  console.log(`Batch upload finished!`);
  console.log(`Newly Added: ${addedCount}`);
  console.log(`Skipped Duplicates: ${skippedCount}`);
  const total = await Job.countDocuments();
  console.log(`Total active jobs in database: ${total}`);
  console.log(`========================================\n`);

  await mongoose.disconnect();
}

uploadBatch().catch(err => {
  console.error('Batch upload error:', err);
  process.exit(1);
});
