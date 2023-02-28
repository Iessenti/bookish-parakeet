import Router from 'express'
import basketController from '../controllers/basketController.js'
import roleMiddleware from '../helpers/roleMiddleware.js'

const router = new Router()

router.get('/:id', roleMiddleware('CUSTOMER'),  basketController.getAll)
router.post('/add-product', roleMiddleware('CUSTOMER'), basketController.addProduct)
router.post('/delete-product', roleMiddleware('CUSTOMER'), basketController.deleteProduct)
router.post('/clear', roleMiddleware('CUSTOMER'), basketController.clear)

export default router