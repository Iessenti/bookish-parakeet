import Router from 'express'
import orderController from '../controllers/orderController.js'

const router = new Router()

router.get('/:id', orderController.getAll)
router.get('/info/:id', orderController.getOne)
router.post('/create', orderController.create)
router.post('/update', orderController.updateStatus)

export default router
