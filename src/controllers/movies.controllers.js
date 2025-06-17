const {
    getsearchMovieByTitle,
    insertMovie,
    updateMovie,
    deleteMovieFromFavorites,
    deleteMovie
} = require('../models/movies.models')

const getMovieByTitle = async (req, res) => {
    const { title } = req.body;
    try {
        //await
        const movies = await getsearchMovieByTitle(title);
        if (!movies.length !== 0){
            return res.status(404).json({
                ok: false,
                msg: 'La pelicula no existe'
            })
        } else {
            return res.status(200).json({
                ok: true,
                msg: 'entra en getMovieByTitle',
                data: movies
            })
        }
    } catch (error) {
        console.log({error});
        res.status(500).json({
            ok:false,
            msg: 'Error. Contacte con el administrador'
        })
    }
}

const getUserFavorites = async (req, res) => {
    const { id } = req.body;
    try {
        const movie = await getUserFavorites(id);
        if(!movie){
            return res.status(404).json({
                ok: false,
                msg: 'Error al mostrar las peliculas favoritas del usuario'
            })
        } else {
            return res.status(201).json({
                ok:true,
                msg: 'Pelicula favoritas',
                data: movie
            })
        }
    } catch (error) {
        console.log({error});
        res.status(500).json({
            ok: false,
            msg: 'Error. Contacte con el administrador'
        })
    }
}

const insertMovie = async (req, res) => {
    const { title, image_url, year_movie, director, genre_id, duration, synopsis } = req.body;
    try {
        const movie = await insertMovie(title, image_url, year_movie, director, genre_id, duration, synopsis);
        if(!movie){
            return res.status(404).json({
                ok: false,
                msg: 'Error al insertar pelicula'
            })
        } else {
            return res.status(201).json({
                ok:true,
                msg: 'Pelicula insertda'
            })
        }
    } catch (error) {
        console.log({error});
        res.status(500).json({
            ok: false,
            msg: 'Error. Contacte con el administrador'
        })
    }
}

const updateMovie = async (req, res) => {
    const { title, image_url, year_movie, director, genre_id, duration, synopsis, id } = req.body;
    try {
        const movie = await updateMovie(title, image_url, year_movie, director, genre_id, duration, synopsis, id);
        if(!movie){
            return res.status(404).json({
                ok: false,
                msg: 'Error al modificar pelicula'
            })
        } else {
            return res.status(200).json({
                ok:true,
                msg: 'Pelicula modificada'
            })
        }
    } catch (error) {
        console.log({error});
        res.status(500).json({
            ok: false,
            msg: 'Error. Contacte con el administrador'
        })
    }
}

const deleteMovieFromFavorites = async (req, res) => {
    const { id } = req.body;
    try {
        const movie = await deleteMovieFromFavorites(id);
        if(!movie){
            return res.status(404).json({
                ok: false,
                msg: 'Error al elimina pelicula de los favoritos'
            })
        } else {
            return res.status(200).json({
                ok:true,
                msg: 'Pelicula eliminada de favoritos'
            })
        }
    } catch (error) {
        console.log({error});
        res.status(500).json({
            ok: false,
            msg: 'Error. Contacte con el administrador'
        })
    }
}

const deleteMovie = async (req, res) => {
    const { id } = req.body;
    try {
        const movie = await deleteMovie(id);
        if(!movie){
            return res.status(404).json({
                ok: false,
                msg: 'Error al elimina pelicula'
            })
        } else {
            return res.status(200).json({
                ok:true,
                msg: 'Pelicula eliminada'
            })
        }
    } catch (error) {
        console.log({error});
        res.status(500).json({
            ok: false,
            msg: 'Error. Contacte con el administrador'
        })
    }
}

module.exports = {
    getMovieByTitle,
    getUserFavorites,
    insertMovie,
    updateMovie,
    deleteMovieFromFavorites,
    deleteMovie
}