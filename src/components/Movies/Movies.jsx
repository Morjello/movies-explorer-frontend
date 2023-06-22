import React, { useEffect, useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { moviesApi } from "../../utils/MoviesApi";
import { mainApi } from "../../utils/MainApi";
import failImg from "../../images/Fail.png";
import {
  ERROR_DELETE_MOVIE,
  ERROR_GET_MOVIES,
  ERROR_SAVE_MOVIE,
} from "../../utils/constants";
import filterMovies from "../../utils/filterMovies";

export default function Movies({
  setIsTooltipOpened,
  setTooltipMessage,
  setIsFetching,
  quantityMoviesOnPage,
  moreMovies,
  savedMovies,
  setSavedMovies,
}) {
  const [showedMovies, setShowedMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isNothingFound, setNothingFound] = useState(false);
  const [moviesInStorage, setMoviesInStorage] = useState(
    JSON.parse(localStorage.getItem("allMovies")) ?? ""
  );
  const [movieQueryInStorage, setMovieQueryInStorage] = useState(
    JSON.parse(localStorage.getItem("movieQuery")) ?? ""
  );
  const [isShortMovieInStorage, setShortMovieInStorage] = useState(
    JSON.parse(localStorage.getItem("isShortMovie")) ?? ""
  );

  const getMovies = async (movieQuery, isShortMovie) => {
    // получение всех фильмов
    try {
      setIsFetching(true);
      const movies = await moviesApi.getMovies();
      const savedMovies = await mainApi.getSavedMovie();
      localStorage.setItem("movieQuery", JSON.stringify(movieQuery));
      localStorage.setItem("isShortMovie", JSON.stringify(isShortMovie));
      localStorage.setItem("allMovies", JSON.stringify(movies));
      setMoviesInStorage(movies);
      setMovieQueryInStorage(movieQuery);
      setShortMovieInStorage(isShortMovie);
      setSavedMovies(savedMovies);
    } catch (err) {
      setIsTooltipOpened(true);
      setTooltipMessage({
        image: failImg,
        text: ERROR_GET_MOVIES,
      });
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if ("allMovies" in localStorage) {
      const modifiedMovies = moviesInStorage.map((movie) => {
        const currentSavedMovie = savedMovies.find((savedMovie) => {
          return savedMovie.movieId === movie.id;
        });
        return {
          ...movie,
          ...(currentSavedMovie && { _id: currentSavedMovie._id }),
        };
      });
      const filteredModifiedMovies = filterMovies(
        modifiedMovies,
        movieQueryInStorage,
        isShortMovieInStorage
      );
      showedMovies.length === 0
        ? setNothingFound(true)
        : setNothingFound(false);
      filteredModifiedMovies.length === 0
        ? setNothingFound(true)
        : setNothingFound(false);
      setShowedMovies(filteredModifiedMovies.slice(0, quantityMoviesOnPage));
      setFilteredMovies(filteredModifiedMovies);
    }
  }, [moviesInStorage, movieQueryInStorage, isShortMovieInStorage]);

  const handleMovieLike = async (movie) => {
    try {
      const likedMovie = await mainApi.saveMovie(movie);
      movie._id = likedMovie._id;
      moviesInStorage.map((m) => m.id === likedMovie.movieId && likedMovie);
      setSavedMovies([...savedMovies, { ...likedMovie, id: movie.id }]);
    } catch (err) {
      setIsTooltipOpened(true);
      setTooltipMessage({
        image: failImg,
        text: ERROR_SAVE_MOVIE,
      });
    }
  };

  const deleteMovie = async (movie) => {
    try {
      const deletedMovie = await mainApi.deleteMovie(movie._id);
      setSavedMovies(savedMovies.filter((m) => m._id !== deletedMovie._id));
      moviesInStorage.map((m) => (m.id === movie.movieId ? deletedMovie : m));
    } catch (err) {
      setIsTooltipOpened(true);
      setTooltipMessage({
        image: failImg,
        text: ERROR_DELETE_MOVIE,
      });
    }
  };

  const addMoreMovies = () => {
    setShowedMovies(
      filterMovies(
        moviesInStorage,
        movieQueryInStorage,
        isShortMovieInStorage
      ).slice(0, showedMovies.length + moreMovies)
    );
  };

  return (
    <section className="moveis">
      <SearchForm
        getMovies={getMovies}
        movieQueryInStorage={movieQueryInStorage}
        isShortMovieInStorage={isShortMovieInStorage}
      />
      <MoviesCardList
        savedMovies={savedMovies}
        handleMovieLike={handleMovieLike}
        deleteMovie={deleteMovie}
        showedMovies={showedMovies}
        addMoreMovies={addMoreMovies}
        filteredMovies={filteredMovies}
        isNothingFound={isNothingFound}
      />
    </section>
  );
}
