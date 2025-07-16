const User = require('../models/User');

// Get paginated users for leaderboard
exports.getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const totalUsers = await User.countDocuments();
    
    const users = await User.find()
      .sort({ points: -1 })
      .skip(skip)
      .limit(limit);
    
    const rankedUsers = users.map((user, index) => {
      const userObj = user.toObject();
      userObj.rank = skip + index + 1;
      return userObj;
    });
    
    res.json({
      users: rankedUsers,
      pagination: {
        total: totalUsers,
        page,
        limit,
        pages: Math.ceil(totalUsers / limit)
      }
    });
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

// Add a new user
// Get all users with optional search
exports.getAllUsers = async (req, res) => {
  try {
    const searchQuery = req.query.search || '';
    
    const query = searchQuery
      ? { name: { $regex: searchQuery, $options: 'i' } }
      : {};
    
    const users = await User.find(query)
      .sort({ points: -1 });
    
    const rankedUsers = users.map((user, index) => {
      const userObj = user.toObject();
      userObj.rank = index + 1;
      return userObj;
    });
    
    res.json({ users: rankedUsers });
  } catch (err) {
    console.error('Error fetching all users:', err);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

exports.addUser = async (req, res) => {
  try {
    const { name, profileImage } = req.body;
    
    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }
    
    // Default profile images
    const profileImages = [
      'https://i.pinimg.com/736x/e9/55/a6/e955a61441385e52e3db78fd8cbe4453.jpg',
      'https://i.pinimg.com/736x/e8/c6/78/e8c6781d0a03959f0125474200649529.jpg',
      'https://i.pinimg.com/736x/95/96/1b/95961b3c05c7baec1504be3370dda6d8.jpg',
      'https://i.pinimg.com/736x/43/a1/12/43a11200a7d0f73cbab231ec4262886c.jpg',
      'https://i.pinimg.com/736x/62/0c/5b/620c5b2cd89fe0564a4ec158e45ef7e8.jpg',
      'https://i.pinimg.com/736x/0b/81/93/0b8193ef3e50534e2195d22db0d0ee0d.jpg'
    ];
    
    const userProfileImage = profileImage || profileImages[Math.floor(Math.random() * profileImages.length)];
    
    const newUser = new User({ 
      name,
      profileImage: userProfileImage
    });
    await newUser.save();
    
    res.status(201).json(newUser);
  } catch (err) {
    console.error('Error adding user:', err);
    res.status(500).json({ message: 'Failed to add user' });
  }
};

// Initialize default users if none exist
exports.initUsers = async (req, res) => {
  try {
    const count = await User.countDocuments();
    
    if (count === 0) {
      const profileImages = [
        'https://i.pinimg.com/736x/e9/55/a6/e955a61441385e52e3db78fd8cbe4453.jpg',
        'https://i.pinimg.com/736x/e8/c6/78/e8c6781d0a03959f0125474200649529.jpg',
        'https://i.pinimg.com/736x/95/96/1b/95961b3c05c7baec1504be3370dda6d8.jpg',
        'https://i.pinimg.com/736x/43/a1/12/43a11200a7d0f73cbab231ec4262886c.jpg',
        'https://i.pinimg.com/736x/62/0c/5b/620c5b2cd89fe0564a4ec158e45ef7e8.jpg',
        'https://i.pinimg.com/736x/0b/81/93/0b8193ef3e50534e2195d22db0d0ee0d.jpg'
      ];
      
      const defaultUsers = [
        { name: 'Rahul', profileImage: profileImages[0] },
        { name: 'Kamal', profileImage: profileImages[1] },
        { name: 'Sanak', profileImage: profileImages[2] },
        { name: 'Priya', profileImage: profileImages[3] },
        { name: 'Amit', profileImage: profileImages[4] },
        { name: 'Neha', profileImage: profileImages[5] },
        { name: 'Vikram', profileImage: profileImages[Math.floor(Math.random() * profileImages.length)] },
        { name: 'Sonia', profileImage: profileImages[Math.floor(Math.random() * profileImages.length)] },
        { name: 'Raj', profileImage: profileImages[Math.floor(Math.random() * profileImages.length)] },
        { name: 'Meera', profileImage: profileImages[Math.floor(Math.random() * profileImages.length)] }
      ];
      
      await User.insertMany(defaultUsers);
      res.status(201).json({ message: 'Default users created' });
    } else {
      res.status(200).json({ message: 'Users already exist' });
    }
  } catch (err) {
    console.error('Error initializing users:', err);
    res.status(500).json({ message: 'Failed to initialize users' });
  }
};