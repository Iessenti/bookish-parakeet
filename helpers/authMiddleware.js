import jwt from 'jsonwebtoken'

export default function (req, res, next) {
    if ( req && req.method === "OPTIONS") {
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({message: "Не авторизован"})
        }
        const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY)
        req.user = decoded
        next()
    } catch (e) {
        if (res) {
        return res.status(401).json({message: "Не авторизован"})
        }
    }
};