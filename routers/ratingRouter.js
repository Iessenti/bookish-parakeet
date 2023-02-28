import Router from 'express'
const router = new Router()

import ratingController from '../controllers/ratingController.js'

router.post('/', ratingController.setRating)

export default router