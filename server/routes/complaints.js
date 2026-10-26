const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');

// In-memory fallback if database is loading
let localComplaints = [
  {
    _id: "seed-c1",
    ticketId: "TKT-2026-1001",
    fullName: "Rahul Varma",
    email: "rahul.varma@gmail.com",
    mobileNumber: "9876543210",
    category: "Job Application Issue",
    subject: "UPSC Official apply link page loading slow on mobile",
    message: "When I click Apply Now on UPSC Civil Services job, the external official page was slow to respond on Jio network. Please verify the official server link.",
    status: "In Progress",
    adminReply: "Verified. UPSC server has heavy traffic due to last date rush. Direct mirror link updated.",
    createdAt: new Date(Date.now() - 1000 * 60 * 180)
  },
  {
    _id: "seed-c2",
    ticketId: "TKT-2026-1002",
    fullName: "Pooja Patel",
    email: "pooja.patel22@gmail.com",
    mobileNumber: "9898123456",
    category: "MCQ / Test Question Error",
    subject: "Question #14 in General Studies CBT test has typo",
    message: "In the 20-question Indian Polity mock test, question #14 option B had a spelling error. Please check and correct.",
    status: "Pending",
    adminReply: "",
    createdAt: new Date(Date.now() - 1000 * 60 * 45)
  }
];

// POST /api/complaints - User submits a new complaint
router.post('/', async (req, res) => {
  try {
    const { fullName, email, mobileNumber, category, subject, message, userId } = req.body;

    if (!fullName || !email || !mobileNumber || !subject || !message) {
      return res.status(400).json({ 
        success: false, 
        error: "Please fill all required fields (Name, Email, Mobile, Subject, and Complaint Details)." 
      });
    }

    const ticketId = `TKT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    let saved = null;
    try {
      saved = await Complaint.create({
        ticketId,
        fullName,
        email,
        mobileNumber,
        category: category || 'Other Complaint',
        subject,
        message,
        status: 'Pending',
        userId: userId || null
      });
    } catch (dbErr) {
      // Fallback in-memory
      saved = {
        _id: 'local-' + Date.now(),
        ticketId,
        fullName,
        email,
        mobileNumber,
        category: category || 'Other Complaint',
        subject,
        message,
        status: 'Pending',
        createdAt: new Date()
      };
      localComplaints.unshift(saved);
    }

    res.status(201).json({
      success: true,
      message: `Your complaint has been submitted successfully! Reference Ticket: ${ticketId}. Dhaval Admin will review it shortly.`,
      complaint: saved,
      ticketId
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/complaints - Admin retrieves all complaints
router.get('/', async (req, res) => {
  try {
    const { status, search } = req.query;

    let list = [];
    try {
      list = await Complaint.find().sort({ createdAt: -1 }).lean();
    } catch (e) {}

    if (!list || list.length === 0) {
      list = localComplaints;
    } else {
      // Append seed non-duplicates
      const remainingSeed = localComplaints.filter(s => !list.some(l => l.ticketId === s.ticketId));
      list = [...list, ...remainingSeed];
    }

    if (status && status !== 'all') {
      list = list.filter(c => c.status?.toLowerCase() === status.toLowerCase());
    }

    if (search && search.trim()) {
      const q = search.toLowerCase().trim();
      list = list.filter(c => 
        (c.fullName && c.fullName.toLowerCase().includes(q)) ||
        (c.ticketId && c.ticketId.toLowerCase().includes(q)) ||
        (c.email && c.email.toLowerCase().includes(q)) ||
        (c.mobileNumber && c.mobileNumber.includes(q)) ||
        (c.subject && c.subject.toLowerCase().includes(q)) ||
        (c.message && c.message.toLowerCase().includes(q))
      );
    }

    res.json({
      success: true,
      count: list.length,
      complaints: list
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT /api/complaints/:id - Admin updates status / reply
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminReply } = req.body;

    let updated = null;
    try {
      updated = await Complaint.findByIdAndUpdate(
        id, 
        { 
          ...(status && { status }),
          ...(adminReply !== undefined && { adminReply })
        },
        { new: true }
      );
    } catch (e) {}

    if (!updated) {
      // Update in local
      const idx = localComplaints.findIndex(c => c._id === id || c.ticketId === id);
      if (idx !== -1) {
        if (status) localComplaints[idx].status = status;
        if (adminReply !== undefined) localComplaints[idx].adminReply = adminReply;
        updated = localComplaints[idx];
      }
    }

    res.json({
      success: true,
      message: "Complaint updated successfully",
      complaint: updated
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /api/complaints/:id - Admin deletes a complaint
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    try {
      await Complaint.findByIdAndDelete(id);
    } catch (e) {}

    localComplaints = localComplaints.filter(c => c._id !== id && c.ticketId !== id);

    res.json({ success: true, message: "Complaint removed successfully", id });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
