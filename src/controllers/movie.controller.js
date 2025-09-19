import { Router } from "express";
import { movieService } from "../services/movieService.js";


const movieController = Router();


movieController.get('/movie/create', (req, res) => {
    res.render('create')
} );

movieController.post('/movie/create', (req, res) => {
   
    const movieData = req.body;

    movieService.create(movieData)
    
    res.redirect('/')

})

export default movieController;

