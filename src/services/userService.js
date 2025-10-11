import User from "../models/User.js"
import bcrypt from 'bcrypt'
import { generateAuthToken } from "../utils/tokenUtis.js"


export default {
   async register(userData) {

    const userExist = await User.exists({email: userData.email})

    if(userExist){
        throw new Error('User already exists!')
    }
        const user = await  User.create(userData)

        const token = generateAuthToken(user)

        return token
    },

    async login(email, password) {

        const user = await User.findOne({ email })

        if (!user) {
            throw new Error('Invalid user or password')
        };

        const isValidPassword = await bcrypt.compare(password, user.password)

        if (!isValidPassword) {
            throw new Error('Invalid user or password')
        };


        const token = generateAuthToken(user)

        return token
    }
}