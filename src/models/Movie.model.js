import { Schema, Types, model} from "mongoose"



const movieSchema = new Schema({
    title: String,
    category: String,
    director: String,
    genre: String,
    year: Number,
    imageUrl: String,
    rating: Number,
    description: String,
    casts: [{
        type: Types.ObjectId,
        ref: 'Cast'
    }],
    owner: {
        type: Types.ObjectId,
        ref: 'User',
    }
})

const Movie = model('Movie', movieSchema);

export default Movie