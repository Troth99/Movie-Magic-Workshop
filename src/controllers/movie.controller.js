import { Router } from "express";


const movieController = Router();


movieController.get('/movie/create', (req, res) => {
    res.render('create')
} );

movieController.post('/movie/create', (req, res) => {
    console.log(req.body);
    
    res.end()

})

export default movieController;

