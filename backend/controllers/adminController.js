const User = require('../models/User');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const Appointment = require('../models/Appointment');
const Review = require('../models/Review');

// 1. Get Admin Dashboard Statistics
exports.getAdminStats = async (req, res) => {
  try {
    const totalPatients = await Patient.countDocuments();
    const totalDoctors = await Doctor.countDocuments();
    const totalAppointments = await Appointment.countDocuments();
    const pendingAppointments = await Appointment.countDocuments({ status: 'pending' });

    res.json({
      success: true,
      stats: {
        totalPatients,
        totalDoctors,
        totalAppointments,
        pendingAppointments
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 2. Doctors Management
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().populate('userId', 'email is_active createdAt');
    res.json({ success: true, doctors });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.toggleDoctorStatus = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ success: false, message: 'Doctor not found' });

    doctor.is_active = req.body.is_active !== undefined ? req.body.is_active : !doctor.is_active;
    await doctor.save();

    if (doctor.userId) {
      await User.findByIdAndUpdate(doctor.userId, { is_active: doctor.is_active });
    }

    res.json({ success: true, message: 'Doctor status updated', is_active: doctor.is_active });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 3. Patients Management
exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find().populate('userId', 'email is_active createdAt');
    res.json({ success: true, patients });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.togglePatientStatus = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ success: false, message: 'Patient not found' });

    patient.is_active = req.body.is_active !== undefined ? req.body.is_active : !patient.is_active;
    await patient.save();

    if (patient.userId) {
      await User.findByIdAndUpdate(patient.userId, { is_active: patient.is_active });
    }

    res.json({ success: true, message: 'Patient status updated', is_active: patient.is_active });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 4. Appointments Management
exports.getAllAppointments = async (req, res) => {
  try {
    const { doctorId, patientId, status, date } = req.query;
    let query = {};

    if (doctorId) query.doctorId = doctorId;
    if (patientId) query.patientId = patientId;
    if (status) query.status = status;
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      query.appointmentDate = { $gte: startDate, $lt: endDate };
    }

    const appointments = await Appointment.find(query)
      .populate('doctorId', 'fullName specialization title')
      .populate('patientId', 'fullName phoneNumber age gender');

    res.json({ success: true, appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    res.json({ success: true, message: 'Appointment status updated', appointment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 5. Reviews Management
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('doctorId', 'fullName specialization')
      .populate('patientId', 'fullName');

    res.json({ success: true, reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 6. Specializations Management (Dynamic)
let mockSpecializations = [
  { _id: 's1', nameAr: 'أمراض القلب', nameEn: 'Cardiology', icon: 'cardiology', is_active: true, doctorsCount: 12 },
  { _id: 's2', nameAr: 'العظام والمفاصل', nameEn: 'Orthopedics', icon: 'orthopedics', is_active: true, doctorsCount: 8 },
  { _id: 's3', nameAr: 'الأطفال وحديثي ولادة', nameEn: 'Pediatrics', icon: 'pediatrics', is_active: true, doctorsCount: 15 },
  { _id: 's4', nameAr: 'الجلدية والتجميل', nameEn: 'Dermatology', icon: 'dermatology', is_active: true, doctorsCount: 10 },
  { _id: 's5', nameAr: 'أمراض الباطنة', nameEn: 'Internal Medicine', icon: 'stethoscope', is_active: true, doctorsCount: 20 }
];

exports.getAllSpecializations = async (req, res) => {
  try {
    res.json({ success: true, specializations: mockSpecializations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createSpecialization = async (req, res) => {
  try {
    const newSpec = {
      _id: 's_' + Date.now(),
      nameAr: req.body.nameAr,
      nameEn: req.body.nameEn || req.body.nameAr,
      icon: req.body.icon || 'medical_services',
      is_active: true,
      doctorsCount: 0
    };
    mockSpecializations.push(newSpec);
    res.status(201).json({ success: true, message: 'Specialization created', specialization: newSpec });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateSpecialization = async (req, res) => {
  try {
    const index = mockSpecializations.findIndex(s => s._id === req.params.id);
    if (index !== -1) {
      mockSpecializations[index] = { ...mockSpecializations[index], ...req.body };
      return res.json({ success: true, message: 'Specialization updated', specialization: mockSpecializations[index] });
    }
    res.status(404).json({ success: false, message: 'Specialization not found' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteSpecialization = async (req, res) => {
  try {
    mockSpecializations = mockSpecializations.filter(s => s._id !== req.params.id);
    res.json({ success: true, message: 'Specialization deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 7. Users Management
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select('-password');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, message: 'User role updated', user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    user.is_active = req.body.is_active !== undefined ? req.body.is_active : !user.is_active;
    await user.save();

    res.json({ success: true, message: 'User status updated', is_active: user.is_active });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
