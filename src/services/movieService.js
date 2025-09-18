import { readFileSync } from "fs";
import Movie from "../models/Movie.js"

import path from "path"

const DB_PATH = path.resolve('src/data/db.json');


function loadDB() {
    const file = readFileSync(DB_PATH, 'utf8');
    return JSON.parse(file)
}



export const movieService = {
    
    getAll() {
        return loadDB()
    },

    findById(id){
        return
    }
}



