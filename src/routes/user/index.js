const express = require('express')
const router = express.Router()
const UserController = require('../../controllers/user/UserController')
const { validateToken } = require('../../middlewares/authenticated')

router.post('/sign-up', UserController.signUp)
router.put('/update-user/:id', UserController.updateUser)
router.put('/update-user-password/:id', UserController.updateUserPassword)
router.get('/get-all', [validateToken], UserController.getAllUsers)
router.get('/:email', [validateToken], UserController.getUser)

module.exports = router
