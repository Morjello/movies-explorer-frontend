import React, { useEffect, useState } from "react";
import failImg from "../../images/Fail.png";
import { mainApi } from "../../utils/MainApi";
import { moviesApi } from "../../utils/MoviesApi";
import {
  ERROR_DELETE_MOVIE,
  ERROR_GET_MOVIES,
  ERROR_SAVE_MOVIE,
} from "../../utils/constants";
import filterMovies from "../../utils/filterMovies";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

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
      if (!("allMovies" in localStorage)) {
        const movies = await moviesApi.getMovies();
        localStorage.setItem("allMovies", JSON.stringify(movies));
        setMoviesInStorage(movies);
      }
      const savedMovies = await mainApi.getSavedMovie();
      localStorage.setItem("movieQuery", JSON.stringify(movieQuery));
      localStorage.setItem("isShortMovie", JSON.stringify(isShortMovie));
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

  console.log(isShortMovieInStorage);

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
      moviesInStorage.map(
        (movieInStorage) =>
          movieInStorage.id === likedMovie.movieId && likedMovie
      );
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
      setSavedMovies(
        savedMovies.filter((savedMovie) => savedMovie._id !== deletedMovie._id)
      );
      moviesInStorage.map((movieInStorage) =>
        movieInStorage.id === movie.movieId ? deletedMovie : movieInStorage
      );
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
        setShortMovieInStorage={setShortMovieInStorage}
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
