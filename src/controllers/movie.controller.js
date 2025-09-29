import { Router } from "express";
import { movieService } from "../services/movieService.js";
import castService from "../services/castService.js";


const movieController = Router();


movieController.get('/movie/create', (req, res) => {
    res.render('create')
});

movieController.post('/movie/create', (req, res) => {

    const movieData = req.body;

    movieService.create(movieData)

    res.redirect('/')

})

movieController.get('/search', async (req, res) => {
    const searchKeys = req.query

    const movies = await movieService.getAll(searchKeys)


    res.render('search', { movies, ...searchKeys })
})

movieController.get('/movies/:movieId/details', async (req, res) => {
    const movieId = req.params.movieId

    const movie = await movieService.findById(movieId).lean();

    const ratingViewData = '&#x2605'.repeat(Math.trunc(movie.rating))

    res.render('details', { movie, rating: ratingViewData })


})

movieController.get('/movies/:movieId/attach', async (req, res) => {
    const movieId = req.params.movieId;

    const movie = await movieService.findById(movieId).lean();

    const casts = await castService.getAll().lean()

    res.render('casts/attach', { movie, casts })
})

export default movieController;

