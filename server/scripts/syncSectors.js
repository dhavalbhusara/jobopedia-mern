require('dotenv').config();
const mongoose = require('mongoose');
const Job = require('../models/Job');

async function sync() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/jobopedia';
  await mongoose.connect(uri);
  console.log('Connected to MongoDB');

  const jobs = await Job.find({});
  console.log('Total jobs found:', jobs.length);

  let updatedCount = 0;
  for (const j of jobs) {
    if (j.category === 'private' || j.category === 'internship') {
      if (!j.sector || j.sector === 'PRIVATE' || j.sector === 'INTERNSHIP') {
        const hay = `${j.title || ''} ${j.department || ''} ${(j.tags || []).join(' ')}`.toLowerCase();
        if (hay.includes('pharma') || hay.includes('doctor') || hay.includes('chemist') || hay.includes('sun pharma')) {
          j.sector = 'Pharma & Healthcare';
        } else if (hay.includes('bank') || hay.includes('hdfc') || hay.includes('finance') || hay.includes('credit')) {
          j.sector = 'Banking, Finance & BFSI';
        } else if (hay.includes('tcs') || hay.includes('wipro') || hay.includes('software') || hay.includes('developer') || hay.includes('engineer') || hay.includes('cloud') || hay.includes('ai')) {
          j.sector = 'IT & Software / Tech';
        } else {
          j.sector = 'IT & Software / Tech';
        }
        await j.save();
        console.log(`Updated "${j.title}" -> ${j.sector}`);
        updatedCount++;
      }
    }
  }

  console.log(`Successfully synced ${updatedCount} jobs with exact sectors!`);
  await mongoose.disconnect();
}

sync().catch(err => {
  console.error("Sync error:", err);
  process.exit(1);
});
