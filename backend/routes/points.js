const express = require('express');
const router = express.Router();
const pointController = require('../controllers/pointController');
const { validatePointClaim, pointsLimiter } = require('../middleware');

// Points routes
router.post('/claim', pointsLimiter, validatePointClaim, pointController.claimPoints);
router.get('/history/:userId', pointController.getUserPointHistory);
router.get('/history', pointController.getAllPointHistory);

module.exports = router;