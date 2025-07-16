const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { validateUser } = require('../middleware');

// User routes
router.get('/', userController.getUsers); // Paginated users for leaderboard
router.get('/all', userController.getAllUsers); // All users with search for selector
router.post('/', validateUser, userController.addUser);
router.post('/init', userController.initUsers);

module.exports = router;