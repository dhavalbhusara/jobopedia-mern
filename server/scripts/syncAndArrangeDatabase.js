require('dotenv').config();
const mongoose = require('mongoose');
const Job = require('../models/Job');
const organizedJobs = require('../data/organizedJobs');

async function syncAndArrangeDatabase() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI not set in environment!");
    process.exit(1);
  }

  console.log("Connecting to MongoDB...");
  await mongoose.connect(uri);
  console.log("Connected to MongoDB successfully!");

  // Step 1: Remove messy test jobs (e.g. 'dgaca', 'dhaval testjob', etc.)
  const junkRegex = /dhaval|dgaca|testjob|teat 5|test 6|test 2/i;
  const junkJobs = await Job.find({ 
    $or: [
      { title: junkRegex },
      { department: junkRegex }
    ]
  });
  if (junkJobs.length > 0) {
    console.log(`Found ${junkJobs.length} test/junk jobs to clean up:`, junkJobs.map(j => j.title));
    const deleteResult = await Job.deleteMany({
      _id: { $in: junkJobs.map(j => j._id) }
    });
    console.log(`Cleaned up ${deleteResult.deletedCount} junk test jobs.`);
  }

  // Step 2: Ensure every job in organizedJobs exists in the database with its exact slug
  let inserted = 0;
  let updated = 0;

  for (const item of organizedJobs) {
    // Look up by slug or exact title
    let existing = await Job.findOne({
      $or: [
        { slug: item.slug },
        { title: item.title }
      ]
    });

    if (existing) {
      // Update existing record to have the latest organized fields & slug
      Object.assign(existing, item);
      existing.slug = item.slug;
      await existing.save();
      updated++;
      console.log(`✓ Updated [${item.category.toUpperCase()}]: ${item.title} -> /?job=${existing.slug}`);
    } else {
      // Insert new job
      const newJob = new Job(item);
      await newJob.save();
      inserted++;
      console.log(`+ Inserted [${item.category.toUpperCase()}]: ${item.title} -> /?job=${newJob.slug}`);
    }
  }

  // Step 3: For any remaining jobs in DB that don't have a slug, generate one
  const allDbJobs = await Job.find({});
  for (const job of allDbJobs) {
    if (!job.slug) {
      job.slug = Job.slugify(job.title) + '-' + job._id.toString().slice(-4);
      await job.save();
      console.log(`Generated slug for existing job: ${job.title} -> ${job.slug}`);
    }
  }

  const finalCount = await Job.countDocuments();
  console.log(`\n🎉 Database sync completed successfully! Total organized jobs in DB: ${finalCount}`);
  
  const sample = await Job.find({}).select('title category slug _id').lean();
  console.log("\nSummary of all jobs in Database with unique links:");
  sample.forEach((j, idx) => {
    console.log(`${idx + 1}. [${j.category}] ${j.title}`);
    console.log(`   Link 1: /?job=${j.slug}`);
    console.log(`   Link 2: /?job=${j._id}`);
  });

  await mongoose.disconnect();
  console.log("\nDisconnected from MongoDB.");
}

syncAndArrangeDatabase().catch(err => {
  console.error("Error syncing database:", err);
  process.exit(1);
});
