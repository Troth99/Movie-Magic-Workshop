
import Movie from "../models/Movie.model.js";


export const movieService = {

    async getAll(filter = {}) {
        let query = Movie.find()

        if (filter.title) {
            query = query.find({ title: { $regex: filter.title, $options: 'i' } })
        }

        if (filter.genre) {
            query = query.find({ genre: { $regex: filter.genre, $options: 'i' } })
        }

        if (filter.year) {
            query = query.where('year').equals(filter.year)
        }

        return await query.lean()
    },

    findById(movieId) {
        return Movie.findById(movieId)
    },

    async create(movieData, ownerId) {

        movieData.owner = ownerId

        const movie = new Movie(movieData);

        await movie.save()
        return movie

    },

    async attach(movieId, castId) {


        return Movie.findByIdAndUpdate(movieId, { $push: { casts: castId } })
        
    },

    delete(movieId){
        return Movie.findByIdAndDelete(movieId)
    }

}



