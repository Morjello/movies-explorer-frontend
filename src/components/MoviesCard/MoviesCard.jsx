import React from "react";
import { useLocation } from "react-router-dom";

export default function MoviesCard({
  movie,
  handleMovieLike,
  deleteMovie,
  savedMovies,
}) {
  const location = useLocation();
  // console.log(savedMoviesInStorage);
  const isLiked = savedMovies
    ? savedMovies.some((m) => m.movieId === movie.id)
    : false;

  const handleLikeClick = () => {
    handleMovieLike(movie);
  };

  const handleDeleteMovie = () => {
    deleteMovie(movie);
  };

  const countDuration = (movie) => {
    const hours = Math.trunc(movie.duration / 60);
    const minutes = movie.duration % 60;
    return hours === 0 ? `${minutes}м` : `${hours}ч ${minutes}м`;
  };

  const handleMovieClick = () => {
    window.location.href = movie.trailerLink;
  };

  return (
    <li className="card">
      <img
        src={
          location.pathname === "/movies"
            ? `https://api.nomoreparties.co/${movie.image.url}`
            : movie.image
        }
        alt="Превью"
        className="card__image"
        target="_blank"
        onClick={handleMovieClick}
      ></img>
      <div className="card__cell">
        <div className="card__container">
          <h3 className="card__title">{movie.nameRU}</h3>
          <p className="card__duration">{countDuration(movie)}</p>
        </div>
        {location.pathname === "/movies" ? (
          <button
            type="button"
            onClick={isLiked ? handleDeleteMovie : handleLikeClick}
            className={`card__like ${isLiked && "card__like_active"}`}
          ></button>
        ) : (
          <button
            type="button"
            onClick={handleDeleteMovie}
            className="card__like card__like_delete"
          ></button>
        )}
      </div>
    </li>
  );
}
