const users = {
    getAllUsers: 'select * from users',
    getUserByEmail: 'select * from users where email = $1',
    createUser: 'insert into users(name_user, email, password_hash, role_id) values($1, $2, $3, $4) RETURNING id_user, name_user, email, password_hash, role_id',
    updateUser: 'update users set name_user=($1), email=($2), password_hash=($3), role_id=($4) where id_user = $5 RETURNING name_user, email, password_hash, role_id',
    deleteUser: 'delete from users where id_user = $1 RETURNING name_user, email, password_hash, role_id',
}

const movies = {
    getsearchMovieByTitle: 'select * from movie where title like %$1%',
    getUserFavorites: 'select movie.title, users.name_user from favorites inner join users on favorites.user_id = users.id_user inner join movie on favorites.movie_id = movie.id_movie where users.name_user like %$1%',
    getsearchMovieByTitle: 'select * from movie where title like %$1%',
    insertMovie: 'insert into movie(title, image_url, year_movie, director, genre_id, duration, synopsis) values ($1, $2, $3, $4, $5, $6, $7) RETURNING title, image_url, year_movie, director, genre_id, duration, synopsis',
    deleteMovieFromFavorites: 'delete from favorites where movie_id = $1',
    deleteMovie: 'delete from movie where id_movie = $1 RETURNING title, image_url, year_movie, director, genre_id, duration, synopsis'



    // Crear pelicula
    // modificar pelicula 
    // cascade en delete pelicula
    // returned en las querys para recibir el resultado











}

module.exports = {
    users,
    movies
};
