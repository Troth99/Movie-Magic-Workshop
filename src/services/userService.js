import User from "../models/User.js"
import bcrypt from 'bcrypt'

export default {
    register(userData) {
        return User.create(userData)
    },

    async login(email, password) {

        const user = await User.find({ email })

        if (!user) {
            throw new Error('Invalid user or password')
        };

        const isValidPassword = await bcrypt.compare(password, user.password)

        if (!isValidPassword) {
            throw new Error('Invalid user or password')
        };


        

    }
}