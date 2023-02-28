import { v4 as uuidv4 } from 'uuid'
import path from 'path'
import fs from 'fs'
import ApiErrorHandler from "../helpers/ApiErrorHandler.js"
import {Product, InfoProduct, Rating} from '../models/models.js'

class ProductController {
    async create(req, res, next) {
        try {
            let {
                title,
                price,
                seller_id,
                category_id, 
                brand_id, 
                description,
                parametres,
            } = req.body
            console.log(
                
                    title,
                    price,
                    seller_id,
                    category_id, 
                    brand_id, 
                    description,
                    parametres,
                )
            const {img} = req.files
            console.log(img)

            let filename = uuidv4() + '.jpg'
            const __dirname = path.resolve()
            img.mv(path.resolve(__dirname, '..', 'public', filename))

            const product = await Product.create({
                title, price, seller_id, category_id, brand_id, description,
                photolink: filename
            })

            if (parametres.length > 0) {
                parametres.forEach( async (param) => 
                    await InfoProduct.create({
                        title: param.title,
                        desc: param.desc,
                        product_id: product.id
                    })
                )
            }
            
            return res.status(200).json(product)

        } catch(err) {
            next(ApiErrorHandler.incorrectRequest(err.message))
        }
    }

    async update(req, res, next) {
        try {
            let updating_data = req.body
            let files = null
            if (req.files) {
                files = req.files
                const d = await Product.findOne({where: {id: updating_data.id}})
                fs.unlinkSync(path.resolve(__dirname, '..', 'public', d.photolink))
                let filename = uuidv4() + '.jpg'
                const __dirname = path.resolve()
                image.mv(path.resolve(__dirname, '..', 'public', filename))
                let m = await Product.update(
                    {
                        photolink: filename
                    },
                    {
                        where: {id: updating_data.id}
                    }
                )
            }

            let params = []
            if (updating_data.parametres) {
                params = updating_data.parametres
                delete updating_data.parametres
                params.forEach( async (param) => 
                    await InfoProduct.update(
                        {
                            ...param
                        },
                        {
                            where: {id: param.id}
                        }
                    )
                )
            }

            const product = await Product.update(
                {
                    ...updating_data
                },
                {
                    where: {id: updating_data.id}
                }
            )

            return res.status(200).json({product})

        } catch(err) {
            next(ApiErrorHandler.incorrectRequest(err.message))
        }
    }

    async getAll(req, res) {
        let {
            brand_id,
            category_id, 
            limit,
            page
        } = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let products

        if (!brand_id && !category_id) {
            products = await Product.findAndCountAll({limit, offset})
        }
        if (brand_id && !category_id) {
            products = await Product.findAndCountAll({where:{brand_id}, limit, offset})
        }
        if (!brand_id && category_id) {
            products = await Product.findAndCountAll({where:{category_id}, limit, offset})
        }
        if (brand_id && category_id) {
            products = await Product.findAndCountAll({where:{category_id, brand_id}, limit, offset})
        }
        return res.json(products)
    }

    async getOne(req, res) {
        const {id} = req.params

        const product = await Product.findOne(
            {
                where: {id},
                include: [{model: InfoProduct, as: 'parametres'}]
            }
        )

        const comments = await Rating.findAll(
            {
                where: {product_id: product.id}
            }
        )

        return res.json({
            ...product,
            comments: [...comments]
        })
    }

}

export default new ProductController()