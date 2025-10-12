import { Router } from "express";
import userService from "../services/userService.js";
import auth from '../middlewares/authMiddleware.js'


const authController = Router();


authController.get('/register', auth.isGuest, (req, res) => {
    res.render('auth/register');
});

authController.post('/register', auth.isGuest, async (req, res) => {
    const userData = req.body;

    try {

        const token = await userService.register(userData)

        res.cookie('auth', token)

        res.redirect('/')

    } catch (error) {
        let errorMessage = error.message

        if (error.name === 'ValidationError') {
            errorMessage = Object.values(error.errors).at(0).message

        }
        res.status(400).render('auth/register', { error: errorMessage, user: userData })
    }
});

authController.get('/login', auth.isGuest, (req, res) => {
    res.render('auth/login')
})

authController.post('/login', auth.isGuest, async (req, res) => {

    const { email, password } = req.body

    const token = await userService.login(email, password)

    res.cookie('auth', token)

    res.redirect('/')
})


authController.get('/logout', (req, res) => {

    res.clearCookie('auth')

    // BONUS: Invalidate JWT token


    res.redirect('/')

})
export default authController