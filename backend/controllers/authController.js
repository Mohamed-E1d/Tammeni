const User = require("../models/User");
const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    { userId: user._id, id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET || "secret",
    {
      expiresIn: "30d",
    },
  );
};

// تسجيل حساب جديد وحفظ البروفايل تلقائياً حسب الدور (Patient / Doctor)
const registerUser = async (req, res) => {
  try {
    const {
      email,
      password,
      role,
      fullName,
      phoneNumber,
      age,
      gender,
      address,
      occupation,
      companyName,
      specialization,
      yearsOfExperience,
      consultationFeeSnapshot,
      education,
      qualifications,
      bio
    } = req.body;

    // 1. Check required account data
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "البريد الإلكتروني وكلمة المرور ونوع الحساب مطلوبين",
      });
    }

    // 2. Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        message: "المستخدم موجود بالفعل",
      });
    }

    // 3. Create User
    const user = await User.create({
      email,
      password,
      role,
    });

    let profile = null;

    // 4. Create coupled Profile based on role
    if (role === 'patient') {
      profile = await Patient.create({
        userId: user._id,
        fullName: fullName || email.split('@')[0],
        phoneNumber: phoneNumber || '01000000000',
        age: age !== undefined && age !== null && age !== '' ? Number(age) : 25,
        gender: gender || 'male',
        address: address || '',
        occupation: occupation || '',
        companyName: companyName || ''
      });
    } else if (role === 'doctor') {
      profile = await Doctor.create({
        userId: user._id,
        fullName: fullName || `د. ${email.split('@')[0]}`,
        specialization: specialization || 'عام',
        yearsOfExperience: yearsOfExperience || 0,
        consultationFeeSnapshot: consultationFeeSnapshot || 200,
        education: education || '',
        qualifications: qualifications || '',
        bio: bio || ''
      });
    }

    // 5. Return account + profile + token
    res.status(201).json({
      _id: user._id,
      email: user.email,
      role: user.role,
      token: generateToken(user),
      user: {
        _id: user._id,
        email: user.email,
        role: user.role,
        profile: profile
      }
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// تسجيل الدخول
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      let profile = null;
      if (user.role === 'patient') {
        profile = await Patient.findOne({ userId: user._id });
      } else if (user.role === 'doctor') {
        profile = await Doctor.findOne({ userId: user._id });
      }

      res.json({
        _id: user._id,
        email: user.email,
        role: user.role,
        token: generateToken(user),
        user: {
          _id: user._id,
          email: user.email,
          role: user.role,
          profile: profile
        }
      });
    } else {
      res.status(401).json({ message: "البريد أو كلمة المرور غير صحيحة" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser };
