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



movieController.get('/movies/:movieId/edit', async (req, res) => {

    const movieId = req.params.movieId;

    const movie = await movieService.findById(movieId).lean()

    const categoriesViewData = getMovieCategoryData(movie.category)

    res.render('edit', { movie, categories: categoriesViewData })
})


movieController.post('/movies/:movieId/edit', async (req, res) => {
    const movieData = req.body;
    const movieId = req.params.movieId

    await movieService.editMovie(movieId, movieData)

    res.redirect(`/movies/${movieId}/details`)

})


function getMovieCategoryData(selectedCategory) {
    const categories = [
        { value: 'tv-show', label: 'TV Show' },
        { value: 'animation', label: 'Animation' },
        { value: 'Movie', label: 'Movie' },
        { value: 'documentary', label: 'Documentary' },
        { value: 'short-film', label: 'Short Film' },
    ];


    const viewData = categories.map(category => ({ ...category, selected: selectedCategory === category.value ? 'selected' : '' }))

    return viewData
}
export default movieController;

