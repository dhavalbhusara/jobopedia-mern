const mongoose = require('mongoose');
const Job = require('../models/Job');
const MockTest = require('../models/MockTest');

let lastRunTimestamp = 0;

/**
 * Get current date in Indian Standard Time (IST) YYYY-MM-DD
 */
function getTodayIST() {
  const now = new Date();
  const istDate = new Date(now.getTime() + (5.5 * 60 * 60 * 1000));
  return istDate.toISOString().split('T')[0];
}

/**
 * Automatically find and permanently delete all jobs where lastDate < todayIST
 */
async function autoDeleteExpiredJobs() {
  try {
    const today = getTodayIST();

    // Query all jobs whose lastDate has passed and is not empty
    const expiredJobs = await Job.find({
      lastDate: { $lt: today, $ne: null, $ne: '' }
    }).select('_id title lastDate department').lean();

    if (!expiredJobs || expiredJobs.length === 0) {
      const remainingCount = await Job.countDocuments();
      console.log(`[AutoExpiredJobsCleaner] ✅ Checked at ${today} (IST) — No expired jobs found. Active jobs: ${remainingCount}`);
      return {
        deletedCount: 0,
        remainingCount,
        purgedAt: new Date().toISOString(),
        expiredList: []
      };
    }

    const expiredIds = expiredJobs.map(j => j._id);
    const deleteResult = await Job.deleteMany({ _id: { $in: expiredIds } });

    // Clean up associated MockTests if any exist
    try {
      await MockTest.deleteMany({ jobId: { $in: expiredIds.map(String) } });
    } catch (e) {}

    const remainingCount = await Job.countDocuments();

    console.log(`[AutoExpiredJobsCleaner] 🧹 Purged ${deleteResult.deletedCount} expired jobs (lastDate < ${today}). Remaining active: ${remainingCount}`);
    expiredJobs.forEach((j, i) => {
      console.log(`   ${i + 1}. [${j._id}] Expired: ${j.lastDate} | ${j.title} (${j.department || 'N/A'})`);
    });

    return {
      deletedCount: deleteResult.deletedCount,
      remainingCount,
      purgedAt: new Date().toISOString(),
      expiredList: expiredJobs
    };
  } catch (error) {
    console.error('[AutoExpiredJobsCleaner Error]:', error.message);
    throw error;
  }
}

/**
 * Throttle helper for incoming API requests:
 * Checks & cleans expired jobs in background at most once every 1 hour
 */
function checkAndPurgeExpiredJobsThrottle() {
  const ONE_HOUR = 60 * 60 * 1000;
  if (Date.now() - lastRunTimestamp > ONE_HOUR) {
    lastRunTimestamp = Date.now();
    setImmediate(() => {
      autoDeleteExpiredJobs().catch(err => {
        console.warn('[AutoExpiredJobsCleaner Throttle Warning]:', err.message);
      });
    });
  }
}

module.exports = {
  autoDeleteExpiredJobs,
  checkAndPurgeExpiredJobsThrottle,
  getTodayIST
};
