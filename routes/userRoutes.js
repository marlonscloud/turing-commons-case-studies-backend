const express = require('express');

const { authUser, getUsers, registerUser, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware')

const router = express.Router()

router.route('/').post(registerUser).get(getUsers)
router.route('/login').post(authUser) // Authorize user
router.route("/:id").get(getUserById).put(protect, updateUser).delete(protect, deleteUser)

module.exports = {
    routes: router
}