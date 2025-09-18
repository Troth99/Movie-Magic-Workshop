import express from "express"
import handlebars from 'express-handlebars'
import homeController from "./controllers/home.controller.js";


const app = express();

//setup Handlebars
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
}));

app.set('view engine', 'hbs');
app.set('views', 'src/views')

//setup middlewares
app.use(express.static('src/public'))


//routes
app.use(homeController)

app.listen(5000, () => console.log('Server is listening on http://localhost:5000...'))