const users = {
  checkUserExists: `select id_user from users where id_user = $1`,
  getUserRole: `select roles.role_name 
                    from users
                    inner join roles on users.role_id = roles.id_role
                    where users.id_user = $1`,
  getAllUsers: `select * from users`,
  getUserByEmail: `select * from users 
                    where email = $1`,
  createUser: `insert into 
                users(name_user, email, password_hash, role_id) 
                values($1, $2, $3, $4) RETURNING name_user, email, password_hash, role_id`,
  updateUser: `update users 
                set name_user=($1), email=($2), password_hash=($3), role_id=($4) 
                where id_user = $5 RETURNING name_user, email, password_hash, role_id`,
  deleteUser: `delete from users 
                where id_user = $1 RETURNING name_user, email, password_hash, role_id`,
  addFavorite: `insert into 
                favorites(user_id, movie_id) 
                values($1, $2)
                RETURNING user_id, movie_id `,
};

const movies = {
  checkMovieExists: `select id_movie from movie where id_movie = $1`,
  //getMovieById: `select * from movie where id_movie = $1`,
  getAllMovies: `select movie.id_movie, movie.title, movie.image_url, movie.image_name, movie.year_movie, movie.director, genre.name_genre, movie.duration, movie.synopsis from movie 
                            inner join genre on movie.genre_id = genre.id_genre`,
  getsearchMovieByTitle: `select movie.id_movie, movie.title, movie.image_url, movie.image_name, movie.year_movie, movie.director, genre.name_genre, movie.duration, movie.synopsis from movie 
                            inner join genre on movie.genre_id = genre.id_genre
                            where title like '%' || $1 || '%'`,
  getsearchMovieById: `select movie.id_movie, movie.title, movie.image_url, movie.image_name, movie.year_movie, movie.director, genre.name_genre, movie.duration, movie.synopsis from movie 
                            inner join genre on movie.genre_id = genre.id_genre
                            where id_movie = $1`,
  getUserFavorites: `select movie.title, users.name_user 
                            from favorites 
                            inner join users on favorites.user_id = users.id_user 
                            inner join movie on favorites.movie_id = movie.id_movie 
                            where users.id_user = $1 `,
  insertMovie: `insert into 
                            movie(title, image_url, image_name, year_movie, director, genre_id, duration, synopsis) 
                            values ($1, $2, $3, $4, $5, $6, $7, $8) 
                            RETURNING title, image_url, image_name, year_movie, director, genre_id, duration, synopsis`,
  updateMovie: `update movie 
                            set title=($2), image_url=($3), image_name=($4), year_movie=($5), director=($6), genre_id=($7), duration=($8), synopsis=($9) 
                            where id_movie = $1 
                            RETURNING title, image_url, image_name, year_movie, director, genre_id, duration, synopsis`,
  deleteMovieFromFavorites: `delete from favorites 
                            where movie_id = $1 and user_id = $2`,
  deleteMovie: `delete from movie 
                            where id_movie = $1 
                            RETURNING title, image_url, year_movie, director, genre_id, duration, synopsis`,

  // Crear pelicula
  // modificar pelicula
  // cascade en delete pelicula
  // returned en las querys para recibir el resultado
};

module.exports = {
  users,
  movies,
};
