import { Schema, model} from "mongoose"



const movieSchema = new Schema({
    title: String,
    category: String,
    director: String,
    genre: String,
    year: Number,
    imageUrl: String,
    rating: Number,
    description: String
})

const Movie = model('Movie', movieSchema);

export default Movie