const filterMovies = (movies, searchQuery, isShortMovie) => {
  // сортировка фильмов
  return movies.filter(
    (movie) =>
      ((isShortMovie ? movie.duration <= 40 : movie) &&
        movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase())) ||
      movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase())
  );
};

export default filterMovies;
