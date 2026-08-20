const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const connectDB = require('./config/db');

dotenv.config();

const createAdminUser = async () => {
  try {
    await connectDB();

    const adminEmail = 'admin@tammeni.com';
    const adminPassword = 'password123';

    let admin = await User.findOne({ email: adminEmail });

    if (admin) {
      admin.password = adminPassword;
      admin.role = 'admin';
      admin.is_active = true;
      await admin.save();
      console.log('✅ Admin user password updated to: password123');
    } else {
      admin = await User.create({
        email: adminEmail,
        password: adminPassword,
        role: 'admin',
        is_active: true
      });
      console.log('✅ Admin user created successfully with email: admin@tammeni.com and password: password123');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
    process.exit(1);
  }
};

createAdminUser();
