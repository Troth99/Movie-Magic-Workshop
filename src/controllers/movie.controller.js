import { Router } from "express";
import { movieService } from "../services/movieService.js";


const movieController = Router();


movieController.get('/movie/create', (req, res) => {
    res.render('create')
});

movieController.post('/movie/create', (req, res) => {

    const movieData = req.body;

    movieService.create(movieData)

    res.redirect('/')

})

movieController.get('/search', (req, res) => {
    const filter = req.query

    const movies = movieService.filter(filter);

    res.render('search', { movies, ...filter })
})

movieController.get('/movies/:movieId/details', async (req, res) => {
    const movieId = req.params.movieId
    
    const movie = await movieService.findById(movieId).lean();

    const ratingViewData = 

    console.log(movie)

    res.render('details', {movie})

    
})

export default movieController;

