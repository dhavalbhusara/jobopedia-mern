const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const JWT_SECRET = process.env.JWT_SECRET || 'jobopedia_super_secure_jwt_secret_2026';

// Persistent Local User File (Fallback backup in sync with MongoDB)
const localDataDir = path.join(__dirname, '..', 'data');
const localUsersFile = path.join(localDataDir, 'users.json');

function getLocalUsers() {
  try {
    if (!fs.existsSync(localDataDir)) fs.mkdirSync(localDataDir, { recursive: true });
    if (!fs.existsSync(localUsersFile)) fs.writeFileSync(localUsersFile, '[]', 'utf8');
    return JSON.parse(fs.readFileSync(localUsersFile, 'utf8') || '[]');
  } catch (e) {
    return [];
  }
}

function saveLocalUsers(users) {
  try {
    if (!fs.existsSync(localDataDir)) fs.mkdirSync(localDataDir, { recursive: true });
    fs.writeFileSync(localUsersFile, JSON.stringify(users, null, 2), 'utf8');
  } catch (e) {
    console.error('Local user save warning:', e.message);
  }
}

// ==============================================================================
// POST /api/auth/register - Create New Account (Save to MongoDB + Verify Unique)
// ==============================================================================
router.post('/register', async (req, res) => {
  try {
    const { fullName, email, mobileNumber, password, state, district, preferredLanguage, qualification } = req.body;

    // 1. Validation
    if (!fullName || !fullName.trim()) {
      return res.status(400).json({ success: false, error: 'Full Name is required.' });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ success: false, error: 'Email Address is required.' });
    }
    if (!password || password.length < 6) {
      return res.status(400).json({ success: false, error: 'Password must be at least 6 characters long.' });
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanMobile = mobileNumber ? mobileNumber.trim() : '';

    // 2. Check if Email or Mobile already exists in MongoDB
    if (mongoose.connection.readyState === 1) {
      const searchCriteria = [{ email: cleanEmail }];
      if (cleanMobile) {
        searchCriteria.push({ mobileNumber: cleanMobile });
      }

      const existingUser = await User.findOne({ $or: searchCriteria });
      if (existingUser) {
        if (existingUser.email === cleanEmail) {
          return res.status(400).json({ 
            success: false, 
            error: 'This Email Address is already registered. Please Login instead.' 
          });
        }
        if (cleanMobile && existingUser.mobileNumber === cleanMobile) {
          return res.status(400).json({ 
            success: false, 
            error: 'This Mobile Number is already registered. Please Login instead.' 
          });
        }
      }
    }

    // 3. Hash Password Securely
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Save to MongoDB Atlas
    let dbUser = null;
    if (mongoose.connection.readyState === 1) {
      try {
        dbUser = await User.create({
          fullName: fullName.trim(),
          email: cleanEmail,
          mobileNumber: cleanMobile,
          password: hashedPassword,
          state: state || 'Gujarat',
          district: district || 'Ahmedabad',
          preferredLanguage: preferredLanguage || 'en',
          qualification: qualification || 'Graduate',
          role: 'CANDIDATE',
          isVerified: true
        });
        console.log(`✅ [MongoDB Atlas] New user registered successfully: ${cleanEmail} (${cleanMobile})`);
      } catch (dbErr) {
        if (dbErr.code === 11000) {
          return res.status(400).json({
            success: false,
            error: 'An account with this Email already exists. Please Login.'
          });
        }
        console.error('MongoDB insert error, falling back to local file:', dbErr.message);
      }
    }

    // 5. Keep Local Backup in sync
    const userId = dbUser ? dbUser._id.toString() : 'usr_' + Date.now();
    const localUsers = getLocalUsers();
    const backupRecord = {
      _id: userId,
      fullName: fullName.trim(),
      email: cleanEmail,
      mobileNumber: cleanMobile,
      password: hashedPassword,
      state: state || 'Gujarat',
      district: district || 'Ahmedabad',
      preferredLanguage: preferredLanguage || 'en',
      qualification: qualification || 'Graduate',
      role: 'CANDIDATE',
      createdAt: new Date().toISOString()
    };
    const existingIdx = localUsers.findIndex(u => u.email === cleanEmail);
    if (existingIdx >= 0) {
      localUsers[existingIdx] = backupRecord;
    } else {
      localUsers.push(backupRecord);
    }
    saveLocalUsers(localUsers);

    // 6. Generate Login Token
    const userPayload = {
      id: userId,
      fullName: fullName.trim(),
      email: cleanEmail,
      mobileNumber: cleanMobile,
      role: 'CANDIDATE'
    };
    const token = jwt.sign(userPayload, JWT_SECRET, { expiresIn: '14d' });

    return res.status(201).json({
      success: true,
      message: `Account created successfully! Welcome to Jobopedia, ${fullName.trim()}.`,
      token,
      user: userPayload
    });

  } catch (err) {
    console.error('Registration API Error:', err);
    return res.status(500).json({ success: false, error: 'Registration failed: ' + err.message });
  }
});

// ==============================================================================
// POST /api/auth/login - Login with Email OR Phone Number + Password Verification
// ==============================================================================
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const identifier = (email || req.body.identifier || req.body.mobileNumber || '').trim();
    const rawPassword = (password || req.body.pass || '').trim();

    if (!identifier || !rawPassword) {
      return res.status(400).json({ 
        success: false, 
        error: 'Please enter your Email or Mobile Number, and Password.' 
      });
    }

    const cleanIdentifier = identifier.toLowerCase();
    const lowerPassword = rawPassword.toLowerCase();
    let foundUser = null;

    // 1. Search in MongoDB Atlas by Email OR Phone Number
    if (mongoose.connection.readyState === 1) {
      try {
        foundUser = await User.findOne({
          $or: [
            { email: cleanIdentifier },
            { mobileNumber: identifier }
          ]
        });
      } catch (err) {
        console.warn('MongoDB search warning:', err.message);
      }
    }

    // 2. If not found in Atlas, check local persistent store
    if (!foundUser) {
      const localUsers = getLocalUsers();
      const localMatch = localUsers.find(u => 
        u.email === cleanIdentifier || u.mobileNumber === identifier
      );
      if (localMatch) {
        foundUser = localMatch;
      }
    }

    // Is identifier pointing to Tushar?
    const isTusharIdentifier = (
      cleanIdentifier === 'tushar@jobopedia.in' ||
      cleanIdentifier === 'tushar' ||
      cleanIdentifier === 'tushar.admin' ||
      cleanIdentifier === 'tushar.admin@jobopedia.in' ||
      cleanIdentifier === 'tushar@careersetu.in' ||
      cleanIdentifier === 'tushar@careersetu.com' ||
      identifier === '9825000002' ||
      identifier === '9876543211' ||
      (foundUser && foundUser.email === 'tushar@jobopedia.in')
    );

    const isTusharPassword = (
      rawPassword === 'Tushar@2026' ||
      lowerPassword === 'tushar@2026' ||
      rawPassword === 'Admin@123456' ||
      lowerPassword === 'admin@123456' ||
      rawPassword === 'Tushar@123' ||
      lowerPassword === 'tushar@123' ||
      lowerPassword === 'tushar123'
    );

    // Is identifier pointing to Dr. Jay Pandit?
    const isJayPanditIdentifier = (
      cleanIdentifier === 'jay.pandit@jobopedia.in' ||
      cleanIdentifier === 'drjaypandit@jobopedia.in' ||
      cleanIdentifier === 'jaypandit' ||
      cleanIdentifier.includes('jay.pandit') ||
      identifier === '9825000001' ||
      (foundUser && foundUser.email === 'jay.pandit@jobopedia.in')
    );

    const isJayPanditPassword = (
      rawPassword === 'JayPandit@2026' ||
      lowerPassword === 'jaypandit@2026' ||
      rawPassword === 'Admin@123456' ||
      lowerPassword === 'admin@123456'
    );

    // Is identifier pointing to Dhaval?
    const isDhavalIdentifier = (
      cleanIdentifier === 'dhaval@jobopedia.in' ||
      cleanIdentifier === 'dhaval' ||
      cleanIdentifier.includes('admin') ||
      cleanIdentifier.includes('dhaval') ||
      identifier === '9510443584' ||
      identifier === '8487944035' ||
      (foundUser && (foundUser.email === 'dhaval@jobopedia.in' || foundUser.email?.includes('dhaval')))
    );

    const isDhavalPassword = (
      rawPassword === 'Dhaval@2026' ||
      lowerPassword === 'dhaval@2026' ||
      rawPassword === 'Admin@123456' ||
      lowerPassword === 'admin@123456'
    );

    // Direct Instant-Access for Tushar Admin
    if (isTusharIdentifier && isTusharPassword) {
      const adminPayload = {
        id: (foundUser && foundUser._id) ? foundUser._id.toString() : 'admin_tushar',
        fullName: 'Tushar',
        email: 'tushar@jobopedia.in',
        mobileNumber: '9825000002',
        role: 'ADMIN',
        state: 'Gujarat',
        qualification: 'Graduate'
      };
      const token = jwt.sign(adminPayload, JWT_SECRET, { expiresIn: '14d' });
      console.log('👑 [Admin Direct Login] Tushar logged in successfully!');
      return res.json({
        success: true,
        message: 'Tushar Admin Login successful',
        token,
        user: adminPayload
      });
    }

    // Direct Instant-Access for Dr. Jay Pandit Admin
    if (isJayPanditIdentifier && isJayPanditPassword) {
      const adminPayload = {
        id: (foundUser && foundUser._id) ? foundUser._id.toString() : 'admin_dr_jay_pandit',
        fullName: 'Dr. Jay Pandit',
        email: 'jay.pandit@jobopedia.in',
        mobileNumber: '9825000001',
        role: 'ADMIN',
        state: 'Gujarat',
        qualification: 'Doctorate / Post Graduate'
      };
      const token = jwt.sign(adminPayload, JWT_SECRET, { expiresIn: '14d' });
      console.log('👑 [Admin Direct Login] Dr. Jay Pandit logged in successfully!');
      return res.json({
        success: true,
        message: 'Dr. Jay Pandit Admin Login successful',
        token,
        user: adminPayload
      });
    }

    // Direct Instant-Access for Dhaval Master Admin
    if (isDhavalIdentifier && isDhavalPassword) {
      const adminPayload = {
        id: (foundUser && foundUser._id) ? foundUser._id.toString() : 'admin_dhaval_master',
        fullName: 'Dhaval Bhusara',
        email: 'dhaval@jobopedia.in',
        mobileNumber: '8487944035',
        role: 'ADMIN',
        state: 'Gujarat',
        qualification: 'Graduate'
      };
      const token = jwt.sign(adminPayload, JWT_SECRET, { expiresIn: '14d' });
      console.log('👑 [Admin Direct Login] Dhaval Admin logged in successfully!');
      return res.json({
        success: true,
        message: 'Dhaval Admin Login successful',
        token,
        user: adminPayload
      });
    }

    // If user not found in database and not matched by master admin shortcuts:
    if (!foundUser) {
      return res.status(401).json({ 
        success: false, 
        error: 'No account found with this Email or Mobile Number. Please Register first.' 
      });
    }

    // 4. Safe Verify Password with bcrypt (guards against undefined password in legacy docs)
    let isPasswordValid = false;
    if (foundUser.password) {
      try {
        isPasswordValid = await bcrypt.compare(rawPassword, foundUser.password);
      } catch (e) {
        console.warn('bcrypt compare warning:', e.message);
      }
    }

    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false, 
        error: 'Incorrect Password. Please check and try again.' 
      });
    }

    // 5. Successful Login -> Generate JWT Token
    const userPayload = {
      id: foundUser._id ? foundUser._id.toString() : foundUser.id,
      fullName: foundUser.fullName,
      email: foundUser.email,
      mobileNumber: foundUser.mobileNumber || '',
      role: foundUser.role || 'CANDIDATE'
    };
    const token = jwt.sign(userPayload, JWT_SECRET, { expiresIn: '14d' });

    console.log(`✅ [Login Success] User: ${foundUser.email} (${foundUser.mobileNumber})`);

    return res.json({
      success: true,
      message: `Welcome back, ${foundUser.fullName}!`,
      token,
      user: userPayload
    });

  } catch (err) {
    console.error('Login API Error:', err);
    return res.status(500).json({ success: false, error: 'Login failed: ' + err.message });
  }
});

// ==============================================================================
// GET /api/auth/me - Verify current logged-in user from token
// ==============================================================================
router.get('/me', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, error: 'Authorization token required' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    if (mongoose.connection.readyState === 1 && decoded.id && !decoded.id.startsWith('usr_')) {
      const user = await User.findById(decoded.id).select('-password');
      if (user) {
        return res.json({ success: true, user });
      }
    }

    return res.json({
      success: true,
      user: {
        id: decoded.id,
        fullName: decoded.fullName,
        email: decoded.email,
        mobileNumber: decoded.mobileNumber,
        role: decoded.role
      }
    });
  } catch (err) {
    return res.status(401).json({ success: false, error: 'Session expired. Please login again.' });
  }
});

// ==============================================================================
// PUT /api/auth/profile - Update candidate profile details
// ==============================================================================
router.put('/profile', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, error: 'Authorization token required' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    const { fullName, mobileNumber, qualification, state, district, preferredLanguage, targetRole } = req.body;

    let updatedUser = null;
    if (mongoose.connection.readyState === 1 && decoded.id && !decoded.id.startsWith('usr_')) {
      updatedUser = await User.findByIdAndUpdate(
        decoded.id,
        {
          ...(fullName && { fullName: fullName.trim() }),
          ...(mobileNumber && { mobileNumber: mobileNumber.trim() }),
          ...(qualification && { qualification }),
          ...(state && { state }),
          ...(district && { district }),
          ...(preferredLanguage && { preferredLanguage }),
          ...(targetRole && { targetRole })
        },
        { new: true }
      ).select('-password');
    }

    if (!updatedUser) {
      updatedUser = {
        id: decoded.id,
        fullName: fullName || decoded.fullName,
        email: decoded.email,
        mobileNumber: mobileNumber || decoded.mobileNumber,
        role: decoded.role || 'CANDIDATE',
        qualification: qualification || 'Graduate',
        state: state || 'Gujarat',
        district: district || 'Ahmedabad',
        preferredLanguage: preferredLanguage || 'en',
        targetRole: targetRole || 'Government & Corporate'
      };
    }

    return res.json({
      success: true,
      message: 'Profile updated successfully!',
      user: updatedUser
    });
  } catch (err) {
    console.error('Update profile error:', err);
    return res.status(500).json({ success: false, error: 'Failed to update profile: ' + err.message });
  }
});

module.exports = router;
