import Cast from "../models/Cast.js"

export default {

    create(data){
        return Cast.create(data)
    },

    getAll(){
        return Cast.find()
    }
}