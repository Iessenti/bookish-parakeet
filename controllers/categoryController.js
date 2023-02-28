
import {CategoryProduct} from '../models/models.js'

class CategoryController {

    async create(req, res) {
        const {name} = req.body
        const category = await CategoryProduct.create({name})
        return res.json(category)
    }

    async getAll(req, res) {
        const {name} = req.query
        let categories
        if (name) {
            categories = await CategoryProduct.findAll(
                {
                    where: {
                        name: {
                            [Op.substring]: sequelize.literal(name.toLowerCase())
                        }
                    }
                }
            )
        } else {
            categories = await CategoryProduct.findAll()
        }
        return res.json(categories)
    }

}

export default new CategoryController()