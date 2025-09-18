import Movie from "../models/Movie.js"

import path from "path"

const DB_PATH = path.resolve('src/data/db.json');



function getAll() {
    return Movie.find()
}


export default {
    getAll,
}