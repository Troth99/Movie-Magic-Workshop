import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/constants.js'

function authMiddleware(req, res, next) {
    const token = req.cookies['auth']

    if (!token) {
        return next()
    }

    try {
        const decodeToken = jwt.verify(token, JWT_SECRET)

        // Attach authenticated user to request
        req.user = decodeToken;
        req.isAuthenticated = true

        // Add to handlebars context
        res.locals.isAuthenticated = true
        res.locals.user = decodeToken

        next()
    } catch (error) {

        res.clearCookie('auth');

        res.redirect('/auth/login');
    }
}

function isAuth(req, res, next) {
    if(!req.isAuthenticated) {
        return res.redirect('/auth/login')
    }

    next()
}

function isGuest(req, res, next) {

    if(req.isAuthenticated){
        return res.redirect('/')
    }

    next()
}

export default {
    authMiddleware,
    isAuth,
    isGuest

}



