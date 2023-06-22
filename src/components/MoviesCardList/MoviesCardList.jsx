import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList({
  handleMovieLike,
  deleteMovie,
  showedMovies,
  savedMovies,
  addMoreMovies,
  filteredMovies,
  isNothingFound,
}) {
  const location = useLocation();
  const disableMoreButton = () => {
    if (
      location.pathname === "/saved-movies" ||
      showedMovies.length === 0 ||
      filteredMovies.length === showedMovies.length
    )
      return "movies-list__button_none";
  };

  return (
    <section className="movies-list">
      {isNothingFound && <p className="movies-list__text">Ничего не найдено</p>}
      <ul className="movies-list__table">
        {showedMovies.length > 0 &&
          showedMovies.map((movie) => {
            return (
              <MoviesCard
                key={movie.id}
                movie={movie}
                handleMovieLike={handleMovieLike}
                deleteMovie={deleteMovie}
                savedMovies={savedMovies}
              />
            );
          })}
      </ul>
      <div className="movies-list__container">
        <button
          className={`movies-list__button ${disableMoreButton()}`}
          onClick={addMoreMovies}
        >
          Ещё
        </button>
      </div>
    </section>
  );
}
