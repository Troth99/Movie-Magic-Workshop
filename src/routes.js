import { Router } from "express"

import homeController from "./controllers/home.controller.js"
import movieController from "./controllers/movie.controller.js"


const routes = Router()

routes.use(homeController)
routes.use(movieController)
routes.use((req, res) => {
    res.status(404).render('404');
})

export default routes