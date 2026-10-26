const express = require('express');
const router = express.Router();
const VisitorLog = require('../models/VisitorLog');

// In-memory real logs fallback in case DB is temporarily reconnecting
let fallbackRealLogs = [];

// POST /api/analytics/track - Track a real actual page view / visitor
router.post('/track', async (req, res) => {
  try {
    const { page, deviceType, browser, state } = req.body;
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const monthStr = dateStr.substring(0, 7);

    const logEntry = {
      date: dateStr,
      month: monthStr,
      page: page || 'home',
      deviceType: (deviceType && deviceType.toLowerCase().includes('mobile')) ? 'Mobile' : 'Desktop',
      browser: browser || 'Browser',
      state: state || 'All India',
      referrer: req.headers['referer'] || 'Direct',
      ip: req.ip || req.headers['x-forwarded-for'] || '127.0.0.1',
      createdAt: now
    };

    try {
      await VisitorLog.create(logEntry);
    } catch (e) {
      fallbackRealLogs.push(logEntry);
    }

    res.json({ success: true, timestamp: now.toISOString() });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/analytics/stats - Aggregate 100% REAL date-wise & month-wise analytics
router.get('/stats', async (req, res) => {
  try {
    const todayStr = new Date().toISOString().split('T')[0];
    const thisMonthStr = todayStr.substring(0, 7);

    // Fetch all real logs from MongoDB Atlas
    let allLogs = [];
    try {
      allLogs = await VisitorLog.find().sort({ createdAt: -1 }).lean();
    } catch (e) {}

    // Merge fallback real logs if any
    if (fallbackRealLogs.length > 0) {
      allLogs = [...allLogs, ...fallbackRealLogs];
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

    // 1. REAL DATE-WISE GROUPING (Exact daily visits)
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
          uniqueVisitors: 0,
          ips: new Set()
        };
      }
      dateMap[d].totalVisits += 1;
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

    // If fresh with today only, ensure today is present
    if (dateWise.length === 0) {
      dateWise.push({
        date: todayStr,
        formattedDate: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
        totalVisits: 0,
        mobileVisits: 0,
        desktopVisits: 0,
        uniqueVisitors: 0
      });
    }

    // 2. REAL MONTH-WISE GROUPING
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

    // 3. REAL TOP PAGES GROUPING
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

    // 4. REAL STATE DISTRIBUTION
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
      topStates
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/analytics/export-csv - Generate CSV of REAL actual visitor analytics
router.get('/export-csv', async (req, res) => {
  try {
    let allLogs = [];
    try {
      allLogs = await VisitorLog.find().sort({ createdAt: -1 }).lean();
    } catch (e) {}

    let csv = "--- JOBOPEDIA REAL ACTUAL VISITOR LOGS (NO FAKE DATA) ---\n";
    csv += "Timestamp,Date,Month,Page Visited,Device Type,Browser,State,IP Address,Referrer\n";
    
    allLogs.forEach(l => {
      const timeStr = l.createdAt ? new Date(l.createdAt).toISOString() : l.date;
      csv += `"${timeStr}","${l.date}","${l.month}","${l.page}","${l.deviceType}","${l.browser}","${l.state}","${l.ip}","${l.referrer}"\n`;
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="Jobopedia_Real_Visitor_Logs.csv"');
    res.send(csv);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
