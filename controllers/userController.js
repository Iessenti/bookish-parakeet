import ApiErrorHandler from "../helpers/ApiErrorHandler.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {Basket, User} from '../models/models.js'

const createJwt = (id, phone, role) => {
    return jwt.sign(
        {id, phone, role},
        process.env.SECRET_JWT_KEY,
        {expiresIn: '24h'}
    )
}


class UserController {
    async registration(req, res, next) {
        const { phone, password, name, role } = req.body

        if (!phone || !password) {
            return res.json(ApiErrorHandler.incorrectRequest('Кажется, вы забыли ввести какие-то данные'))
        }
        
        const potential_user = await User.findOne({where: {phone}})
        if (potential_user) {
            return res.json(ApiErrorHandler.incorrectRequest('Такой пользователь уже существует'))
        }

        let user = null
        const hashPassword = await bcrypt.hash(password, 5)
        if (role === 'SELLER') {
            if (name && name.length > 5) {
                user = await User.create({phone, password: hashPassword, role, name})
            } else {
                return res.json(ApiErrorHandler.incorrectRequest('Пожалуйста, укажите название Вашей компании'))
            }
        } else if (role === 'CUSTOMER') {
            user = await User.create({phone, password: hashPassword, role})
            const basket = await Basket.create({user_id: user.id})
        }

        if (user && user.id) {
            const token = createJwt(user.id, user.phone, user.role)
            return res.json({token})
        } else {
            return res.json(ApiErrorHandler.incorrectRequest('Что-то пошло не так'))
        }
    }

    async login(req, res, next) {
        const {phone, password} = req.body

        const user = await User.findOne({where: {phone}})
        if (!user) {
            return res.json(ApiErrorHandler.incorrectRequest('Такой пользователь не уже существует'))
        }

        let compare_password = bcrypt.compareSync(password, user.password)
        if (!compare_password) {
            return res.json(ApiErrorHandler.incorrectRequest('Неправильный пароль'))
        }

        const token = createJwt(user.id, user.phone, user.role)
        return res.json({token})
    }

    async check(req, res, next) {
        console.log(req)
        const token = createJwt(req.user.id, req.user.phone, req.user.role)
        return res.json({token})
    }
}

export default new UserController()