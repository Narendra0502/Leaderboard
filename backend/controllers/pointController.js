const User = require('../models/User');
const PointHistory = require('../models/PointHistory');

// Claim points for a user
exports.claimPoints = async (req, res) => {
  try {
    const { userId } = req.body;
    
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const points = Math.floor(Math.random() * 10) + 1;
    
    user.points += points;
    await user.save();
    
    const pointHistory = new PointHistory({
      userId,
      points
    });
    await pointHistory.save();
    
    res.json({ 
      user, 
      pointsAwarded: points,
      message: `${points} points awarded to ${user.name}`
    });
  } catch (err) {
    console.error('Error claiming points:', err);
    res.status(500).json({ message: 'Failed to claim points' });
  }
};

// Get point history for a specific user with pagination
exports.getUserPointHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const totalEntries = await PointHistory.countDocuments({ userId });
    
    const history = await PointHistory.find({ userId })
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit)
      .populate('userId', 'name');
    
    res.json({
      history,
      pagination: {
        total: totalEntries,
        page,
        limit,
        pages: Math.ceil(totalEntries / limit)
      }
    });
  } catch (err) {
    console.error('Error fetching user point history:', err);
    res.status(500).json({ message: 'Failed to fetch point history' });
  }
};

// Get all point history with pagination
exports.getAllPointHistory = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const totalEntries = await PointHistory.countDocuments();
    
    const history = await PointHistory.find()
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit)
      .populate('userId', 'name');
    
    res.json({
      history,
      pagination: {
        total: totalEntries,
        page,
        limit,
        pages: Math.ceil(totalEntries / limit)
      }
    });
  } catch (err) {
    console.error('Error fetching all point history:', err);
    res.status(500).json({ message: 'Failed to fetch point history' });
  }
};