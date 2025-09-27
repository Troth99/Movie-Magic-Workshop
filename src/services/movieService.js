import { readFileSync, writeFileSync } from "fs";


import path from "path"
import Movie from "../models/Movie.model.js";

const DB_PATH = path.resolve('src/data/db.json');


function saveDB(movies) {
    writeFileSync(DB_PATH, JSON.stringify({ movies }, null, 2), 'utf8')
}

export const movieService = {

    async getAll(filter) {
        const result = await Movie.find(filter).lean()

        return result
    },

    findById(id) {
        return
    },

   async create(movieData) {
    
        const movie = new Movie(movieData);

        await movie.save()
        return movie

    },


    filter(filter) {
        let movie = this.getAll();

        if (filter.title) {
            movie = movie.filter(m => m.title.toLowerCase().includes(filter.title.toLowerCase()))
        }

        if (filter.genre) {
            movie = movie.filter(m => m.genre.toLowerCase().includes(filter.genre.toLowerCase()))
        }

        if (filter.year) {
            movie = movie.filter(m => m.year === filter.year)
        }

        return movie
    }


}



