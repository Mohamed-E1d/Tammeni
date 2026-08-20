const express = require('express');
const router = express.Router();
const { protect, checkRole } = require('../middlewares/auth');

const {
  getAdminStats,
  getAllDoctors,
  toggleDoctorStatus,
  getAllPatients,
  togglePatientStatus,
  getAllAppointments,
  updateAppointmentStatus,
  getAllReviews,
  deleteReview,
  getAllSpecializations,
  createSpecialization,
  updateSpecialization,
  deleteSpecialization,
  getAllUsers,
  updateUserRole,
  toggleUserStatus
} = require('../controllers/adminController');

// All routes require auth & admin role
router.use(protect);
router.use(checkRole('admin'));

// Stats
router.get('/stats', getAdminStats);

// Doctors
router.get('/doctors', getAllDoctors);
router.put('/doctors/:id/toggle-status', toggleDoctorStatus);

// Patients
router.get('/patients', getAllPatients);
router.put('/patients/:id/toggle-status', togglePatientStatus);

// Appointments
router.get('/appointments', getAllAppointments);
router.put('/appointments/:id/status', updateAppointmentStatus);

// Reviews
router.get('/reviews', getAllReviews);
router.delete('/reviews/:id', deleteReview);

// Specializations
router.get('/specializations', getAllSpecializations);
router.post('/specializations', createSpecialization);
router.put('/specializations/:id', updateSpecialization);
router.delete('/specializations/:id', deleteSpecialization);

// Users & Roles
router.get('/users', getAllUsers);
router.put('/users/:id/role', updateUserRole);
router.put('/users/:id/toggle-status', toggleUserStatus);

module.exports = router;
