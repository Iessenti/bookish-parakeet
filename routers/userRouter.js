import Router from 'express'
const router = new Router()

import userController from '../controllers/userController.js'
import authMiddleware from '../helpers/authMiddleware.js'

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)

export default router