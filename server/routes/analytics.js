const express = require('express');
const router = express.Router();
const VisitorLog = require('../models/VisitorLog');

// Helper to extract clean real IP from reverse proxies (Vercel, Render, Cloudflare)
function getClientIp(req) {
  if (req.body && req.body.clientIp && typeof req.body.clientIp === 'string' && req.body.clientIp.trim().length > 6) {
    return req.body.clientIp.trim();
  }
  const cf = req.headers['cf-connecting-ip'];
  if (cf) return String(cf).trim();

  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    const first = String(forwarded).split(',')[0].trim();
    if (first) return first.replace(/^::ffff:/, '');
  }

  const realIp = req.headers['x-real-ip'];
  if (realIp) return String(realIp).trim().replace(/^::ffff:/, '');

  const remote = req.connection?.remoteAddress || req.socket?.remoteAddress || req.ip;
  if (remote) {
    const cleaned = String(remote).replace(/^::ffff:/, '');
    return cleaned === '::1' ? '127.0.0.1' : cleaned;
  }

  return '127.0.0.1';
}

// POST /api/analytics/track - Track 1 unique visitor per IP per day
router.post('/track', async (req, res) => {
  try {
    const { page, deviceType, browser, state } = req.body;
    const clientIp = getClientIp(req);
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0]; // Format: 'YYYY-MM-DD'
    const monthStr = dateStr.substring(0, 7); // Format: 'YYYY-MM'

    // 1. Check if this IP has ALREADY been recorded for TODAY
    let existingLog = null;
    try {
      existingLog = await VisitorLog.findOne({ ip: clientIp, date: dateStr });
    } catch (e) {}

    if (existingLog) {
      // User has ALREADY visited today!
      // Do NOT create a duplicate entry. Simply update their latest activity time and page views count.
      existingLog.page = page || existingLog.page;
      existingLog.visitCount = (existingLog.visitCount || 1) + 1;
      existingLog.timestamp = now;
      if (state && state !== 'All India') existingLog.state = state;
      if (deviceType) existingLog.deviceType = (deviceType.toLowerCase().includes('mobile')) ? 'Mobile' : 'Desktop';
      
      try {
        await existingLog.save();
      } catch (saveErr) {}

      return res.json({ 
        success: true, 
        isNewToday: false, 
        ip: clientIp,
        date: dateStr,
        visitCount: existingLog.visitCount,
        message: "Visitor already recorded for today. Activity updated." 
      });
    }

    // 2. Fresh unique visitor for today (or when the date changes!)
    const logEntry = {
      date: dateStr,
      month: monthStr,
      page: page || 'home',
      deviceType: (deviceType && deviceType.toLowerCase().includes('mobile')) ? 'Mobile' : 'Desktop',
      browser: browser || 'Browser',
      state: state || 'All India',
      referrer: req.headers['referer'] || 'Direct',
      ip: clientIp,
      visitCount: 1,
      timestamp: now,
      createdAt: now
    };

    try {
      await VisitorLog.create(logEntry);
    } catch (err) {
      // If race condition on unique index (ip + date), treat as updated
      if (err.code === 11000) {
        await VisitorLog.updateOne(
          { ip: clientIp, date: dateStr },
          { $inc: { visitCount: 1 }, $set: { timestamp: now, page: page || 'home' } }
        );
      }
    }

    return res.json({ 
      success: true, 
      isNewToday: true, 
      ip: clientIp,
      date: dateStr,
      visitCount: 1,
      message: "New daily unique visitor recorded." 
    });

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/analytics/stats - Aggregate 100% REAL unique daily visitor stats
router.get('/stats', async (req, res) => {
  try {
    const todayStr = new Date().toISOString().split('T')[0];
    const thisMonthStr = todayStr.substring(0, 7);

    // Fetch all real unique daily logs from MongoDB Atlas
    let allLogs = [];
    try {
      allLogs = await VisitorLog.find().sort({ timestamp: -1, createdAt: -1 }).lean();
    } catch (e) {
      console.error("DB Fetch Error in stats:", e.message);
    }

    const totalLifetimeVisits = allLogs.length;
    const todayLogs = allLogs.filter(l => l.date === todayStr);
    const thisMonthLogs = allLogs.filter(l => l.month === thisMonthStr);

    const todayVisits = todayLogs.length;
    const thisMonthVisits = thisMonthLogs.length;

    // Mobile vs Desktop Ratio
    const mobileCount = allLogs.filter(l => l.deviceType === 'Mobile').length;
    const desktopCount = allLogs.filter(l => l.deviceType === 'Desktop').length;
    const mobileRatio = totalLifetimeVisits > 0 ? Math.round((mobileCount / totalLifetimeVisits) * 100) : 50;
    const desktopRatio = totalLifetimeVisits > 0 ? 100 - mobileRatio : 50;

    // 1. DATE-WISE GROUPING (Unique visitors per day)
    const dateMap = {};
    allLogs.forEach(log => {
      const d = log.date || todayStr;
      if (!dateMap[d]) {
        const dateObj = new Date(d);
        dateMap[d] = {
          date: d,
          formattedDate: isNaN(dateObj.getTime()) ? d : dateObj.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
          totalVisits: 0,
          mobileVisits: 0,
          desktopVisits: 0,
          totalPageViews: 0,
          uniqueVisitors: 0,
          ips: new Set()
        };
      }
      dateMap[d].totalVisits += 1;
      dateMap[d].totalPageViews += (log.visitCount || 1);
      if (log.deviceType === 'Mobile') dateMap[d].mobileVisits += 1;
      else dateMap[d].desktopVisits += 1;
      dateMap[d].ips.add(log.ip || log._id);
    });

    const dateWise = Object.values(dateMap)
      .map(item => ({
        ...item,
        uniqueVisitors: item.ips.size || item.totalVisits
      }))
      .sort((a, b) => a.date.localeCompare(b.date));

    // Ensure today is present
    if (dateWise.length === 0) {
      dateWise.push({
        date: todayStr,
        formattedDate: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
        totalVisits: 0,
        mobileVisits: 0,
        desktopVisits: 0,
        totalPageViews: 0,
        uniqueVisitors: 0
      });
    }

    // 2. MONTH-WISE GROUPING
    const monthMap = {};
    allLogs.forEach(log => {
      const m = log.month || thisMonthStr;
      if (!monthMap[m]) {
        const [year, monthNum] = m.split('-');
        const dateObj = new Date(year, parseInt(monthNum || '1') - 1, 1);
        monthMap[m] = {
          month: m,
          monthName: isNaN(dateObj.getTime()) ? m : dateObj.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }),
          totalVisits: 0,
          mobileVisits: 0,
          desktopVisits: 0,
          uniqueVisitors: 0,
          ips: new Set()
        };
      }
      monthMap[m].totalVisits += 1;
      if (log.deviceType === 'Mobile') monthMap[m].mobileVisits += 1;
      else monthMap[m].desktopVisits += 1;
      monthMap[m].ips.add(log.ip || log._id);
    });

    const monthWise = Object.values(monthMap)
      .map(item => ({
        ...item,
        uniqueVisitors: item.ips.size || item.totalVisits
      }))
      .sort((a, b) => a.month.localeCompare(b.month));

    if (monthWise.length === 0) {
      monthWise.push({
        month: thisMonthStr,
        monthName: new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }),
        totalVisits: 0,
        mobileVisits: 0,
        desktopVisits: 0,
        uniqueVisitors: 0
      });
    }

    // 3. TOP PAGES
    const pageMap = {};
    allLogs.forEach(log => {
      const p = log.page || 'home';
      pageMap[p] = (pageMap[p] || 0) + 1;
    });

    const topPages = Object.entries(pageMap)
      .map(([page, views]) => ({
        page,
        views,
        share: totalLifetimeVisits > 0 ? `${Math.round((views / totalLifetimeVisits) * 100)}%` : '0%'
      }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 8);

    // 4. TOP STATES
    const stateMap = {};
    allLogs.forEach(log => {
      const st = log.state || 'All India';
      stateMap[st] = (stateMap[st] || 0) + 1;
    });

    const topStates = Object.entries(stateMap)
      .map(([state, count]) => ({
        state,
        percentage: totalLifetimeVisits > 0 ? Math.round((count / totalLifetimeVisits) * 100) : 0
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 6);

    // 5. LIVE RECENT UNIQUE VISITORS STREAM (Showing exact IP address, 1 entry per user per day)
    const recentVisitors = allLogs.slice(0, 50).map(l => ({
      id: l._id ? l._id.toString() : 'log-' + Math.random(),
      timestamp: l.timestamp || l.createdAt || new Date(),
      date: l.date || todayStr,
      page: l.page || 'home',
      deviceType: l.deviceType || 'Desktop',
      browser: l.browser || 'Browser',
      state: l.state || 'All India',
      ip: l.ip || '127.0.0.1',
      visitCount: l.visitCount || 1
    }));

    res.json({
      success: true,
      isRealDataOnly: true,
      summary: {
        totalLifetimeVisits,
        todayVisits,
        thisMonthVisits,
        mobileRatio,
        desktopRatio,
        todayDate: todayStr,
        currentMonth: thisMonthStr
      },
      dateWise,
      monthWise,
      topPages,
      topStates,
      recentVisitors
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/analytics/export-csv - Generate CSV of REAL unique visitor logs with IP addresses
router.get('/export-csv', async (req, res) => {
  try {
    let allLogs = [];
    try {
      allLogs = await VisitorLog.find().sort({ timestamp: -1 }).lean();
    } catch (e) {}

    let csv = "--- JOBOPEDIA DAILY UNIQUE VISITOR LOGS (1 VISIT PER USER PER DAY) ---\n";
    csv += "Date,Time,Visitor IP Address,Page Visited,Device Type,Browser,State,Today's Page Views,Referrer\n";
    
    allLogs.forEach(l => {
      const timeStr = l.timestamp ? new Date(l.timestamp).toLocaleTimeString('en-IN') : 'N/A';
      csv += `"${l.date}","${timeStr}","${l.ip}","${l.page}","${l.deviceType}","${l.browser}","${l.state}","${l.visitCount || 1}","${l.referrer}"\n`;
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="Jobopedia_Unique_Visitors_Report.csv"');
    res.send(csv);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
