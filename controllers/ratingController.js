import {Product, Rating} from '../models/models.js'

class RatingController {

    async setRating(req, res) {
        const {
            user_id,
            product_id,
            rating,
            comment
        } = req.body

        const existing_rating = await Rating.findOne({
            where: {user_id: user_id, product_id: product_id}
        })

        if (!existing_rating) {
            const all_ratings = await Rating.findAll({
                where: {product_id: product_id}
            })

            let rating_obj = await Rating.create({
                user_id, product_id, rating, comment
            })

            let prev_all_rating_sum = 0
            all_ratings.forEach( (rat) => prev_all_rating_sum+=rat.rating)

            rating_obj = await Product.update(
                {
                    rating: Math.round( ((prev_all_rating_sum + rating) / (all_ratings.length + 1))* 100 ) / 100
                },
                {
                    where: {id: product_id}
                }
            )

            return res.json({rating_obj})
        }

        
    }

}

export default new RatingController()