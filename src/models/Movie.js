 
import data from "./data/db.json" assert {type: "json"};

 class Movie {

    static find() {
        return data.movies
    }
    static findById(id) {

 }

}


export default Movie