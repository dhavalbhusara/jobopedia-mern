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
    } else {
      // Append non-duplicate seed items
      const remainingSeed = SEED_NOTIFICATIONS.filter(s => !combined.some(c => c.title === s.title));
      combined = [...combined, ...remainingSeed];
    }

    // Filter notifications according to candidate's Interest & Degree/Qualification
    let filtered = combined.filter(n => {
      // Category / Interest filter
      if (category && category !== 'all' && n.category !== category) {
        return false;
      }

      // State Filter: Notification reaches candidate if:
      // 1) Candidate state is not specified, or is 'all'
      // 2) Notification is Pan-India / Central / All India
      // 3) Any of the job's target states matches candidate's state
      if (state && state !== 'all') {
        const userState = state.toLowerCase().trim();
        
        let targetStateList = [];
        if (Array.isArray(n.targetStates) && n.targetStates.length > 0) {
          targetStateList = n.targetStates.map(s => String(s).toLowerCase().trim());
        } else if (n.targetState) {
          targetStateList = String(n.targetState).toLowerCase().split(',').map(s => s.trim());
        }

        const isPanIndia = targetStateList.length === 0 || targetStateList.some(s => 
          s.includes('all india') || s.includes('central') || s.includes('pan-india') || s === 'all'
        );

        if (!isPanIndia) {
          const stateMatches = targetStateList.some(s => 
            s.includes(userState) || userState.includes(s)
          );
          if (!stateMatches) return false;
        }
      }

      // Qualification / Degree Filter: Notification reaches candidate if:
      // 1) Candidate qualification is not specified, or is 'all'
      // 2) Notification targets 'All', 'Any Graduate', 'Any Stream', or is open
      // 3) Any of the job's target qualifications matches candidate's qualification
      if (qualification && qualification !== 'all') {
        const userQ = qualification.toLowerCase().trim();

        let targetQList = [];
        if (Array.isArray(n.targetQualifications) && n.targetQualifications.length > 0) {
          targetQList = n.targetQualifications.map(q => String(q).toLowerCase().trim());
        } else if (n.targetQualification) {
          targetQList = String(n.targetQualification).toLowerCase().split(',').map(q => q.trim());
        }

        const isForAll = targetQList.length === 0 || targetQList.some(q => 
          q.includes('all') || q.includes('any') || q.includes('any stream') || q.includes('any discipline') || q.includes('any graduate')
        );

        if (!isForAll) {
          const matchesAnyQ = targetQList.some(notifQ => {
            const directMatch = notifQ.includes(userQ) || userQ.includes(notifQ);
            const bothGraduate = (notifQ.includes('graduat') || notifQ.includes('degree') || notifQ.includes('bachelor')) && 
                                 (userQ.includes('graduat') || userQ.includes('degree') || userQ.includes('bachelor') || userQ.includes('b.tech') || userQ.includes('bca') || userQ.includes('b.sc') || userQ.includes('b.com') || userQ.includes('b.a') || userQ.includes('bba'));
            const both12th = notifQ.includes('12th') && userQ.includes('12th');
            const both10th = (notifQ.includes('10th') || notifQ.includes('matric') || notifQ.includes('ssc')) && 
                             (userQ.includes('10th') || userQ.includes('matric') || userQ.includes('ssc'));
            const bothIti = notifQ.includes('iti') && userQ.includes('iti');
            const bothDiploma = (notifQ.includes('diploma') || notifQ.includes('polytechnic')) && 
                                (userQ.includes('diploma') || userQ.includes('polytechnic'));
            const bothEng = (notifQ.includes('tech') || notifQ.includes('engineer')) && 
                            (userQ.includes('tech') || userQ.includes('engineer') || userQ.includes('cs') || userQ.includes('it'));
            const bothCommerce = (notifQ.includes('commerce') || notifQ.includes('b.com') || notifQ.includes('m.com') || notifQ.includes('ca')) &&
                                 (userQ.includes('commerce') || userQ.includes('b.com') || userQ.includes('m.com') || userQ.includes('ca'));
            const bothMedical = (notifQ.includes('mbbs') || notifQ.includes('pharm') || notifQ.includes('nursing')) &&
                                (userQ.includes('mbbs') || userQ.includes('pharm') || userQ.includes('nursing'));
            const bothPostGrad = (notifQ.includes('post graduat') || notifQ.includes('master') || notifQ.includes('pg') || notifQ.includes('mba') || notifQ.includes('mca') || notifQ.includes('m.tech')) &&
                                 (userQ.includes('post graduat') || userQ.includes('master') || userQ.includes('pg') || userQ.includes('mba') || userQ.includes('mca') || userQ.includes('m.tech'));

            return directMatch || bothGraduate || both12th || both10th || bothIti || bothDiploma || bothEng || bothCommerce || bothMedical || bothPostGrad;
          });

          if (!matchesAnyQ) {
            return false;
          }
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
    const { title, message, category, targetQualification, targetQualifications, targetState, targetStates, url, jobId } = req.body;

    if (!title || !message) {
      return res.status(400).json({ success: false, error: "Title and message are required." });
    }

    // Normalize states
    let sList = [];
    if (Array.isArray(targetStates) && targetStates.length > 0) {
      sList = targetStates.filter(Boolean);
    } else if (targetState) {
      sList = String(targetState).split(',').map(s => s.trim()).filter(Boolean);
    }
    if (sList.length === 0) sList = ['All India'];

    // Normalize qualifications
    let qList = [];
    if (Array.isArray(targetQualifications) && targetQualifications.length > 0) {
      qList = targetQualifications.filter(Boolean);
    } else if (targetQualification) {
      qList = String(targetQualification).split(',').map(q => q.trim()).filter(Boolean);
    }
    if (qList.length === 0) qList = ['All'];

    const stateDisplay = sList.length > 2 ? `${sList.slice(0, 2).join(', ')} +${sList.length - 2} more` : sList.join(', ');
    const qualDisplay = qList.length > 2 ? `${qList.slice(0, 2).join(', ')} +${qList.length - 2} more` : qList.join(', ');

    let savedNotif = null;
    try {
      savedNotif = await Notification.create({
        title,
        message,
        category: category || 'govt',
        targetQualification: qualDisplay,
        targetQualifications: qList,
        targetState: stateDisplay,
        targetStates: sList,
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
        targetQualification: qualDisplay,
        targetQualifications: qList,
        targetState: stateDisplay,
        targetStates: sList,
        url: url || 'https://jobopedia.in',
        createdAt: new Date()
      };
    }

    res.json({
      success: true,
      message: `Notification broadcasted to candidates matching [States: ${stateDisplay} | Qualifications: ${qualDisplay}]!`,
      notification: savedNotif
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
