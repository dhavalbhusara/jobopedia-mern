const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const Job = require('../models/Job');

async function cleanExpiredJobs() {
  console.log('Connecting to MongoDB Atlas...');
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected successfully!');

  const today = '2026-11-23';

  // Find all jobs where lastDate < today
  const expiredJobs = await Job.find({
    lastDate: { $lt: today, $ne: null, $ne: '' }
  });

  console.log(`Found ${expiredJobs.length} expired jobs (lastDate < ${today}):`);
  expiredJobs.forEach((j, i) => {
    console.log(`${i + 1}. [${j._id}] LastDate: ${j.lastDate} | ${j.title} (${j.department || 'N/A'})`);
  });

  if (expiredJobs.length > 0) {
    const ids = expiredJobs.map(j => j._id);
    const deleteResult = await Job.deleteMany({ _id: { $in: ids } });
    console.log(`\nSuccessfully deleted ${deleteResult.deletedCount} expired jobs from MongoDB.`);
  } else {
    console.log('\nNo expired jobs found to delete.');
  }

  const remainingCount = await Job.countDocuments();
  console.log(`Remaining active jobs in database: ${remainingCount}`);

  await mongoose.disconnect();
  console.log('Disconnected from MongoDB.');
}

cleanExpiredJobs().catch(err => {
  console.error('Error cleaning expired jobs:', err);
  process.exit(1);
});
