import { MAX_DURATION_OF_SHORT_MOVIES } from "./constants";

const filterMovies = (movies, searchQuery, isShortMovie) => {
  // сортировка фильмов
  return movies.filter(
    (movie) =>
      ((isShortMovie
        ? movie.duration <= MAX_DURATION_OF_SHORT_MOVIES
        : movie) &&
        movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase())) ||
      movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase())
  );
};

export default filterMovies;
