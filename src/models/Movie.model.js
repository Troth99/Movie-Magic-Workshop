import { Schema, Types, model } from "mongoose"



const movieSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Movie title is required!'],
        minLenght: [5, 'Title is to short!'],
        match: [/^[a-zA-Z0-9 ]$/, 'Title has some invalid characters!'],
    },
    category: {
        type: String,
        enum: {
            values: ['tv-show', 'animation', 'movie', 'documentary', 'short-film'],
            message: 'Your category is invalid!'
        },
        required: [true, 'Movie category is requried!']
    },
    director: {
        type: String,
        required: [true, 'Movie director is required!'],
        minLenght: [5, 'Movie director is to short!'],
        match: [/^[a-zA-Z0-9 ]$/, 'Director input  has some invalid characters!'],

    },
    genre: {
        type: String,
        required: [true, 'Movie genre is required!'],
        minLenght: [5, 'Movie genre is to short!'],
        match: [/^[a-zA-Z0-9 ]$/, 'Genre has some invalid characters!'],
    },
    year: {
        type: Number,
        required: [true, 'Movie year is requried!'],
        min: [1900, 'Movie cannot be before 1900 year'],
        max: [2024, 'Movie year cannot be greater than 2024!']
    },
    imageUrl: {
        type: String,
        required: [true, 'Movie image url is required!'],
        match: [/https?:\/\//, 'Image url is invalid!']
    },
    rating: {
        type: Number,
        requried: [true, 'Movie rating is required'],
        min: [1, 'Rating cannot be less than 1'],
        max: [10, 'Rating cannot be more than 10']
    },
    description: {
        type: String,
        required: [true, 'Movie description is required!'],
        minLenght: [20, 'Description should be at least 20 characters!'],
        match: [/^[a-zA-Z0-9 ]$/, 'Movie description input  has some invalid characters!'],
    },
    casts: [{
        type: Types.ObjectId,
        ref: 'Cast'
    }],
    owner: {
        type: Types.ObjectId,
        ref: 'User',
        required: [true, 'Movie should have creator.']
    }
})

const Movie = model('Movie', movieSchema);

export default Movie