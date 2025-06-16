const users = {
    getAllUsers: 'select * from users',
    getUserByEmail: 'select * from users where email = $1',
    createUser: 'insert into users(name_user, email, password_hash, role_id) values($1, $2, $3, $4)',
    updateUser: 'update users set name_user=(%1) where id_user = %2'
}

const movies = {
    getsearchMovieByTitle: 'select * from movie where title like %$1%',
    getUserFavorites: 'select movie.title, users.name_user from favorites inner join users on favorites.user_id = users.id_user inner join movie on favorites.movie_id = movie.id_movie where users.name_user like %$1%',
    getsearchMovieByTitle: 'select * from movie where title like %$1%',
    deleteMovieFromFavorites: 'delete from favorites where movie_id = $1',
    deleteMovie: 'delete from movie where id_movie = $1'
}

module.exports = {
    users,
    movies
};
