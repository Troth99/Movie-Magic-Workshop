import { Router } from "express";
import { movieService } from "../services/movieService.js";
import castService from "../services/castService.js";
import auth from "../middlewares/authMiddleware.js"

const movieController = Router();


movieController.get('/movie/create', auth.isAuth, (req, res) => {

    res.render('create')
});

movieController.post('/movie/create', auth.isAuth, (req, res) => {

    const movieData = req.body;
    const ownerId = req.user.id

    movieService.create(movieData, ownerId)

    res.redirect('/')

})

movieController.get('/search', async (req, res) => {
    const searchKeys = req.query

    const movies = await movieService.getAll(searchKeys)


    res.render('search', { movies, ...searchKeys })
})

movieController.get('/movies/:movieId/details', async (req, res) => {
    const movieId = req.params.movieId
    const movie = await movieService.findById(movieId).populate('casts').lean();



    const ratingViewData = '&#x2605'.repeat(Math.trunc(movie.rating))

    const isOwner = req.user?.id && movie.owner == req.user.id

    res.render('details', { movie, rating: ratingViewData, casts: movie.casts, isOwner })


})

movieController.get('/movies/:movieId/attach', async (req, res) => {
    const movieId = req.params.movieId;

    const movie = await movieService.findById(movieId).lean();

    const casts = await castService.getAll().lean()

    res.render('casts/attach', { movie, casts })
})


movieController.post('/movies/:movieId/attach', async (req, res) => {
    const movieId = req.params.movieId;
    const castId = req.body.cast;

    await movieService.attach(movieId, castId)

    res.redirect(`/movies/${movieId}/details`)
})

movieController.get('/movies/:movieId/delete', auth.isAuth, async (req, res) => {
    const movieId = req.params.movieId;

    const movie = await movieService.findById(movieId);

    if (!movie.owner?.equals(req.user.id)) {
        return res.redirect('/')
    }

    await movieService.delete(movieId)

    res.redirect('/')
})
export default movieController;

