const asyncHandler = require('express-async-handler')
const User = require('../models/userModel.js')
const generateToken = require('../utils/generateToken')

// @desc    Auth the user & get token
// @route   GET /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find User with email address
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
      res.json({
        data: {
            id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
            imageUrl: user.imageUrl
          }
        });
  } else {
      res.status(401).json({error: 'Incorrect Login Details'});
      throw new Error("Invalid email or password");
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { email, password, name, roles, imageUrl } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({ message: "User already exists" });
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password, 
    roles, 
    imageUrl
  });

  if (user) {
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Public
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
});


// @desc    Get single User
// @route   GET /api/users/:id
// @access  Public
const getUserById = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (user) {
      res.json(user);
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    console.log(error);
  }
});


// @desc    Update user
// @route   PUT /api/users/profile
// @access  Private / Admin
//TODO: Add Password Update
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.imageUrl = req.body.imageUrl || user.imageUrl;
    user.roles = req.body.roles || user.roles;
    user.password = req.body.password || user.password;
    // user.isAdmin = req.body.isAdmin || user.isAdmin;

    const updatedUser = await user.save();

    res.json({
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});


// @desc    Delete user
// @route   DEL /api/users/:id
// @access  Private / Admin
const deleteUser = async (req, res) => {
  try {
      const u = await User.findById(req.params.id)
      if(u) {
          await u.remove()
          res.json({ message: 'User Removed'})
      } else {
          res.status(404);
          throw new Error("User not found");
      }
  } catch (error) {
      res.status(500).json({ error });
  }
}

module.exports = { authUser, registerUser, getUsers, getUserById, updateUser, deleteUser }