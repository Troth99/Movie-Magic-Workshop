import { readFileSync, writeFileSync } from "fs";
import Movie from "../models/Movie.js"

import path from "path"

const DB_PATH = path.resolve('src/data/db.json');


function loadDB() {
    const file = readFileSync(DB_PATH, 'utf8');
    return JSON.parse(file)
}


function saveDB(movies) {
    writeFileSync(DB_PATH, JSON.stringify({movies}, null, 2), 'utf8')
}

export const movieService = {
    
    getAll() {
        const dataMovies = loadDB()
        return dataMovies.movies
    },

    findById(id){
        return
    },

    create(movieData) {
        const db = loadDB()

        const movie = new Movie(movieData);

        db.movies.push(movie)

        saveDB(db.movies)

        return movie
        
    }

    
}



