import Cast from "../models/Cast.js"

export default {

    create(data) {
        return Cast.create(data)
    },

    getAll(filter = {}) {
        let query = Cast.find();

        if (filter.includes) {
            query = query.where({ '_id': { $in: filter.includes } })
        }
        return query
    }
}