import {randomUUID as randomID} from "crypto"


class Movie {

    constructor(data) {
        this._id = data._id || randomID()
        Object.assign(this, data)
    }

}


export default Movie