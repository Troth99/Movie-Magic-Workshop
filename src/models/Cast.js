import { Schema, Types, model } from "mongoose";

const castSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Cast name is required!']
    },
    age: {
        type: Number,
        required: [true, 'Cast age is required!']
    },
    born: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
})

const Cast = model('Cast', castSchema);

export default Cast