
import { Basket, BasketProduct, Product } from "../models/models.js"

class BasketController {

    async getAll(req, res) {
        const {id} = req.params
        
        const basket = await Basket.findOne({ where: {user_id: id}})
        const basket_id = basket.id

        const basket_products = await BasketProduct.findAll({
            where: {basket_id: basket_id}
        })
        const basket_products_id = basket_products.map( bas => (bas.product_id))
        
        const products = await Product.findAll({
            where: {
                id: basket_products_id
            }
        })

        return res.json(products)

    }

    async addProduct(req, res) {
        const {user_id, product_id} = req.body

        const basket = await Basket.findOne({ where: {user_id: user_id}})
        const basket_id = basket.id

        const basket_products = await BasketProduct.create({
            basket_id: basket_id, product_id: product_id
        })

        return res.status(200)
    }

    async deleteProduct(req, res) {
        const {user_id, product_id} = req.body

        const basket = await Basket.findOne({ where: {user_id: user_id}})
        const basket_id = basket.id

        const basket_products = await BasketProduct.destroy({
            where: {basket_id: basket_id, product_id: product_id}
        })

        return res.status(200)
    }

    async clear(req, res) {
        const {user_id} = req.body

        const basket = await Basket.findOne({ where: {user_id: user_id}})
        const basket_id = basket.id

        const basket_products = await BasketProduct.destroy({
            where: {basket_id}
        })

        return res.status(200)
    }

}

export default new BasketController()