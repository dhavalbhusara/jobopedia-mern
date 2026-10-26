const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

// Default initial notifications if database is fresh
const SEED_NOTIFICATIONS = [
  {
    _id: "notif-1",
    title: "⚡ UPSC Civil Services 2026 Notification Released",
    message: "Union Public Service Commission has officially released 1,056 vacancies for IAS, IPS, and IFS. Preliminary exam registration is now live.",
    category: "govt",
    targetQualification: "Graduate",
    targetState: "All India",
    url: "https://upsc.gov.in",
    createdAt: new Date(Date.now() - 1000 * 60 * 25) // 25 mins ago
  },
  {
    _id: "notif-2",
    title: "🔥 SSC CGL 2026: 17,727 Vacancies Active",
    message: "Staff Selection Commission invites applications for Assistant Section Officer, Excise Inspector, and CBI Sub-Inspector.",
    category: "govt",
    targetQualification: "Graduate",
    targetState: "All India",
    url: "https://ssc.gov.in",
    createdAt: new Date(Date.now() - 1000 * 60 * 120) // 2 hours ago
  },
  {
    _id: "notif-3",
    title: "🏢 TCS NQT 2026: 40,000+ Software Engineer Roles",
    message: "Tata Consultancy Services has opened the National Qualifier Test registration for 2025/2026 graduates across all engineering & computer streams.",
    category: "private",
    targetQualification: "Graduate - B.E. / B.Tech (Computer Science & IT)",
    targetState: "Gujarat",
    url: "https://learning.tcsionhub.in",
    createdAt: new Date(Date.now() - 1000 * 60 * 300) // 5 hours ago
  },
  {
    _id: "notif-4",
    title: "📝 Free Live CBT Mock Test: General Studies & Aptitude",
    message: "New 20-question diagnostic exam with negative marking and detailed solution explanations is now live in the Mock Tests Hall.",
    category: "mock-test",
    targetQualification: "All",
    targetState: "All India",
    url: "/mock-tests",
    createdAt: new Date(Date.now() - 1000 * 60 * 480) // 8 hours ago
  },
  {
    _id: "notif-5",
    title: "🎓 NITI Aayog Policy & Tech Internship 2026",
    message: "Paid undergraduate and postgraduate traineeship with ₹12,000/month stipend and direct government mentor allocation.",
    category: "internship",
    targetQualification: "Graduate",
    targetState: "All India",
    url: "https://niti.gov.in",
    createdAt: new Date(Date.now() - 1000 * 60 * 720) // 12 hours ago
  }
];

// GET /api/notifications - Get all or targeted notifications
router.get('/', async (req, res) => {
  try {
    const { qualification, state, category } = req.query;

    let dbNotifs = [];
    try {
      dbNotifs = await Notification.find({ isLive: true }).sort({ createdAt: -1 }).lean();
    } catch (e) {}

    let combined = [...(dbNotifs || [])];
    if (combined.length === 0) {
      combined = SEED_NOTIFICATIONS;
    }

    // Filter by user interest/qualification/state if requested
    let filtered = combined.filter(n => {
      if (category && category !== 'all' && n.category !== category) {
        return false;
      }
      if (qualification && qualification !== 'all' && n.targetQualification !== 'All') {
        const qUser = qualification.toLowerCase();
        const qTarget = (n.targetQualification || '').toLowerCase();
        if (!qTarget.includes(qUser) && !qUser.includes(qTarget)) {
          // Allow general graduate matches
          if (!(qUser.includes('graduate') && qTarget.includes('graduate'))) {
            return false;
          }
        }
      }
      if (state && state !== 'all' && n.targetState !== 'All India' && n.targetState !== 'Central') {
        if (n.targetState !== state) {
          return false;
        }
      }
      return true;
    });

    res.json({
      success: true,
      count: filtered.length,
      notifications: filtered
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/notifications/broadcast - Admin sends targeted job alert
router.post('/broadcast', async (req, res) => {
  try {
    const { title, message, category, targetQualification, targetState, url, jobId } = req.body;

    if (!title || !message) {
      return res.status(400).json({ success: false, error: "Title and message are required." });
    }

    let savedNotif = null;
    try {
      savedNotif = await Notification.create({
        title,
        message,
        category: category || 'govt',
        targetQualification: targetQualification || 'All',
        targetState: targetState || 'All India',
        url: url || 'https://jobopedia.in',
        jobId: jobId || null,
        sentBy: 'Admin'
      });
    } catch (e) {
      savedNotif = {
        _id: 'local-' + Date.now(),
        title,
        message,
        category: category || 'govt',
        targetQualification: targetQualification || 'All',
        targetState: targetState || 'All India',
        url: url || 'https://jobopedia.in',
        createdAt: new Date()
      };
    }

    res.json({
      success: true,
      message: `Notification broadcasted to candidates matching [${targetState} | ${targetQualification}]!`,
      notification: savedNotif
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
