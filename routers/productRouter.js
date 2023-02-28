import Router from 'express'
import productController from '../controllers/productController.js'
import roleMiddleware from '../helpers/roleMiddleware.js'

const router = new Router()

router.post('/create', roleMiddleware('SELLER'), productController.create)
router.post('/update', roleMiddleware('SELLER'), productController.update)
router.get('/', productController.getAll)
router.get('/:id', productController.getOne)

export default router
