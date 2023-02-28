import Router from 'express'
import brandController from '../controllers/brandController.js'
import roleMiddleware from '../helpers/roleMiddleware.js'

const router = new Router()

router.post('/create', roleMiddleware('SELLER'), brandController.create)
router.get('/', brandController.getAll)

export default router