import Router from 'express'
import categoryController from '../controllers/categoryController.js'
import roleMiddleware from '../helpers/roleMiddleware.js'

const router = new Router()

router.post('/create', roleMiddleware('SELLER'), categoryController.create)
router.get('/', categoryController.getAll)

export default router