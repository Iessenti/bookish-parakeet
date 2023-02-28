
import {BrandProduct} from '../models/models.js'

class BrandController {

    async create(req, res) {
        const {name} = req.body
        const brand = await BrandProduct.create({name})
        return res.json(brand)
    }

    async getAll(req, res) {
        const {name} = req.query
        let brands
        if (name) {
            brands = await BrandProduct.findAll(
                {
                    where: {
                        name: {
                            [Op.substring]: sequelize.literal(name.toLowerCase())
                        }
                    }
                }
            )
        } else {
            brands = await BrandProduct.findAll()
        }
        return res.json(brands)
    }

}

export default new BrandController()