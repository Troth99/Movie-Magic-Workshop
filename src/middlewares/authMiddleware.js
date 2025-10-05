import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/constants.js'

function authMiddleware(req, res, next) {
    const token = req.cookies['auth']

    if (!token) {
        return next()
    }

    try {
        const decodeToken = jwt.verify(token, JWT_SECRET)

        req.user = decodeToken;
        req.isAuthenticated = true

        next()
    } catch (error) {

        res.clearCookie('auth');

        res.redirect('/auth/login');
    }
}

export default {
    authMiddleware

}

