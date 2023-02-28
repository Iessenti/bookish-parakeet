import Router from 'express'
const router = new Router()

import userRouter from './userRouter.js'
import productRouter from './productRouter.js'
import ratingRouter from './ratingRouter.js'
import brandRouter from './brandRouter.js'
import categoryRouter from './categoryRouter.js'
import basketRouter from './basketRouter.js'
import orderRouter from './orderRouter.js'

router.use('/user', userRouter)
router.use('/product', productRouter)
router.use('/rating', ratingRouter)
router.use('/brand', brandRouter)
router.use('/category', categoryRouter)
router.use('/basket', basketRouter)
router.use('/order', orderRouter)

export default router