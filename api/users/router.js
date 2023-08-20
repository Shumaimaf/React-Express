const express = require('express')
const router = express.Router()

const { SignUp, Login, allUsers, userbyEmail, getUserById, deleteUser, updateUser } = require('./controller')

router.post('/login', Login)
router.post('/signup', SignUp)
router.get('/getallusers', allUsers)
router.get('/userbyemail/:email', userbyEmail);
router.get('/user/:id', getUserById);
router.delete('/user/:id', deleteUser)
router.put('/user/:id', updateUser);

module.exports = router