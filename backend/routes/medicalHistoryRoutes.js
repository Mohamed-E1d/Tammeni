const express = require('express');
const router = express.Router();
const { getMedicalHistory } = require('../controllers/medicalHistoryController');

const { protect } = require('../middlewares/auth');

// Route: GET /api/patients/:patientId/medical-history
router.get('/:patientId/medical-history', protect, getMedicalHistory);
router.get('/history', protect, getMedicalHistory);

module.exports = router;

