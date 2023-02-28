import { Order, Product, OrderProduct, Basket, BasketProduct } from "../models/models.js"

class OrderController {

    async create(req, res) {
        const {
            user_id,
        } = req.body

        const basket = await Basket.findOne({
            where: {user_id}
        })
        const basket_id = basket.id

        const basket_products = await BasketProduct.findAll({
            where: {basket_id}
        })
        const basket_products_id = basket_products.map( prod => (prod.product_id))

        const products = await Product.findAll({
            where: {
                id: basket_products_id
            }
        })

        const order = await Order.create({
            user_id,
            date: Date.now(),
            
            status: 'Cоздан'
        })

        let summary_price = 0

        products.forEach( async (product) => {
            await BasketProduct.destroy({
                where: {
                    product_id: product.id
                }
            })
            await OrderProduct.create({
                order_id: order.id,
                product_id: product.id
            })
            summary_price += product.price
        })

        return res.json(order)
    }   

    async updateStatus(req, res) {
        const {
            status,
            order_id
        } = req.body

        const order = await Order.update(
            {
                status
            },
            {
                where: {id: order_id}
            }
        )

        return res.json(order)
    }   

    async getAll(req, res) {
        const {id} = req.params

        const orders = await Order.findAll({
            where: {user_id: id}
        })

        return res.json(orders)
    }

    async getOne(req, res) {
        const {id} = req.params

        const order = await Order.findOne({
            where: {id}
        })

        const order_products = await OrderProduct.findAll({
            where: {
                order_id: order.id
            }
        })
        const order_products_id = order_products.map( pr => (pr.id))

        const products = await Product.findAll({
            where: {
                id: order_products_id
            }
        })
        
        return res.json({
            ...order,
            products: products
        })

    }

}

export default new OrderController()