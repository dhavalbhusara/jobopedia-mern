const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const User = require('../models/User');

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

async function createAdminUsers() {
  const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
  if (!mongoUri) {
    console.error("MONGODB_URI not found in .env");
  } else {
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB Atlas!");
  }

  const salt = await bcrypt.genSalt(10);

  const adminUsers = [
    {
      fullName: 'Dhaval Bhusara',
      email: 'dhaval@jobopedia.in',
      mobileNumber: '8487944035',
      passwordPlain: 'Dhaval@2026',
      role: 'ADMIN',
      state: 'Gujarat',
      district: 'Ahmedabad',
      qualification: 'Graduate',
      preferredLanguage: 'en',
      isVerified: true
    },
    {
      fullName: 'Dr. Jay Pandit',
      email: 'jay.pandit@jobopedia.in',
      mobileNumber: '9825000001',
      passwordPlain: 'JayPandit@2026',
      role: 'ADMIN',
      state: 'Gujarat',
      district: 'Ahmedabad',
      qualification: 'Doctorate / Post Graduate',
      preferredLanguage: 'en',
      isVerified: true
    },
    {
      fullName: 'Tushar',
      email: 'tushar@jobopedia.in',
      mobileNumber: '9825000002',
      passwordPlain: 'Tushar@2026',
      role: 'ADMIN',
      state: 'Gujarat',
      district: 'Gandhinagar',
      qualification: 'Graduate',
      preferredLanguage: 'en',
      isVerified: true
    }
  ];

  const localUsers = getLocalUsers();

  for (const admin of adminUsers) {
    const hashedPassword = await bcrypt.hash(admin.passwordPlain, salt);

    if (mongoose.connection.readyState === 1) {
      const existing = await User.findOne({ email: admin.email.toLowerCase() });
      if (existing) {
        existing.fullName = admin.fullName;
        existing.password = hashedPassword;
        existing.role = 'ADMIN';
        existing.state = admin.state;
        existing.district = admin.district;
        existing.qualification = admin.qualification;
        existing.preferredLanguage = admin.preferredLanguage;
        await existing.save();
        console.log(`[MongoDB] Updated existing Admin user: ${admin.fullName} (${admin.email})`);
      } else {
        await User.create({
          fullName: admin.fullName,
          email: admin.email.toLowerCase(),
          mobileNumber: admin.mobileNumber,
          password: hashedPassword,
          role: 'ADMIN',
          state: admin.state,
          district: admin.district,
          qualification: admin.qualification,
          preferredLanguage: admin.preferredLanguage,
          isVerified: true
        });
        console.log(`[MongoDB] Created new Admin user: ${admin.fullName} (${admin.email})`);
      }
    }

    // Local backup
    const backupRecord = {
      _id: 'admin_' + admin.fullName.toLowerCase().replace(/[^a-z0-9]/g, '_'),
      fullName: admin.fullName,
      email: admin.email.toLowerCase(),
      mobileNumber: admin.mobileNumber,
      password: hashedPassword,
      state: admin.state,
      district: admin.district,
      preferredLanguage: admin.preferredLanguage,
      qualification: admin.qualification,
      role: 'ADMIN',
      createdAt: new Date().toISOString()
    };

    const exIdx = localUsers.findIndex(u => u.email === admin.email.toLowerCase());
    if (exIdx >= 0) {
      localUsers[exIdx] = backupRecord;
    } else {
      localUsers.push(backupRecord);
    }
  }

  saveLocalUsers(localUsers);
  console.log("Local users.json updated!");

  if (mongoose.connection.readyState === 1) {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  }
}

createAdminUsers().catch(err => {
  console.error("Error creating admin users:", err);
  process.exit(1);
});
