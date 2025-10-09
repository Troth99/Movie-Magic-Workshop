import { Schema, Types, model } from "mongoose";

const castSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Cast name is required!'],
        minLenght: [5, 'Name is to short!'],
        match: [/^[a-zA-Z0-9 ]$/, 'Name has some invalid characters!'],
    },
    age: {
        type: Number,
        required: [true, 'Cast age is required!'],
        max: [120, 'Age cannot be more than 120!'],
        min: [0, 'Age cannot be lower than 1!']
    },
    born: {
        type: String,
        required: true,
        minLenght: [10, 'Born should be atleast 10 characters long!'],
        match: [/^[a-zA-Z0-9 ]$/, 'Born has some invalid characters!'],
    },
    imageUrl: {
        type: String,
        required: true,
        match: [/https?:\/\//, 'Image url is invalid!']
    }
})

const Cast = model('Cast', castSchema);

export default Cast