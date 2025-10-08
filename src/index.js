import express from "express"
import handlebars from 'express-handlebars'
import routes from "./routes.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import auth from "./middlewares/authMiddleware.js";


const app = express();

// mongoose.set('debug', true);

//setup Database
const url = 'mongodb://localhost:27017'

try {
    await mongoose.connect(url, {
        dbName: 'movie-magic-2025',
    })

    console.log('Connected to DB!')
} catch (error) {
    console.error('Cannot connect to DB', error.message)
}

//setup Handlebars
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    helpers: {
        eq: (a,b) => a === b
    }
}));

app.set('view engine', 'hbs');
app.set('views', 'src/views')

//setup middlewares
app.use(express.static('src/public'))
app.use(express.urlencoded())

// Cookie parser
app.use(cookieParser())
app.use(auth.authMiddleware)
//routes
app.use(routes)

app.listen(5000, () => console.log('Server is listening on http://localhost:5000...'))