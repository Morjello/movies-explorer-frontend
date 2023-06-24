import { useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { mainApi } from "../../utils/MainApi";
import failImg from "../../images/Fail.png";
import { ERROR_DELETE_MOVIE } from "../../utils/constants";
import filterMovies from "../../utils/filterMovies";

export default function SavedMovies({
  setTooltipMessage,
  setIsTooltipOpened,
  savedMovies,
  setSavedMovies,
}) {
  const [filteredSavedMovies, setFilteredSavedMovies] = useState(null);
  const [isNothingFound, setNothingFound] = useState(false);
  const modifiedSavedMovies = savedMovies.map((savedMovie) => {
    return { ...savedMovie, id: savedMovie.movieId };
  });

  const getMovies = (movieQuery, isShortMovie) => {
    const filteredSavedMovies = filterMovies(
      modifiedSavedMovies,
      movieQuery,
      isShortMovie
    );

    setFilteredSavedMovies(filteredSavedMovies);
    filteredSavedMovies.length === 0
      ? setNothingFound(true)
      : setNothingFound(false);
  };

  const deleteSavedMovie = async (movie) => {
    try {
      const deletedMovie = await mainApi.deleteMovie(movie._id);
      setSavedMovies(
        savedMovies.filter((savedMovie) => savedMovie._id !== deletedMovie._id)
      );
      if (filteredSavedMovies !== null) {
        setFilteredSavedMovies(
          savedMovies.filter(
            (savedMovie) => savedMovie._id !== deletedMovie._id
          )
        );
      }
    } catch (err) {
      setIsTooltipOpened(true);
      setTooltipMessage({
        image: failImg,
        text: ERROR_DELETE_MOVIE,
      });
    }
  };
  const showSavedMovies = () => {
    return filteredSavedMovies === null
      ? modifiedSavedMovies
      : filteredSavedMovies;
  };

  return (
    <>
      <SearchForm getMovies={getMovies} />
      <MoviesCardList
        showedMovies={showSavedMovies()}
        savedMovies={savedMovies}
        deleteMovie={deleteSavedMovie}
        isNothingFound={isNothingFound}
      />
    </>
  );
}
