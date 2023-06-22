import { useEffect, useState } from "react";
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
  allSavedMovies,
}) {
  const [isNothingFound, setNothingFound] = useState(false);
  const getMovies = (movieQuery, isShortMovie) => {
    const filteredSavedMovies = filterMovies(
      allSavedMovies,
      movieQuery,
      isShortMovie
    );
    setSavedMovies(filteredSavedMovies);
    filteredSavedMovies.length === 0
      ? setNothingFound(true)
      : setNothingFound(false);
  };

  const deleteSavedMovie = async (movie) => {
    try {
      const deletedMovie = await mainApi.deleteMovie(movie._id);
      setSavedMovies(savedMovies.filter((m) => m._id !== deletedMovie._id));
    } catch (err) {
      setIsTooltipOpened(true);
      setTooltipMessage({
        image: failImg,
        text: ERROR_DELETE_MOVIE,
      });
    }
  };

  return (
    <>
      <SearchForm getMovies={getMovies} />
      <MoviesCardList
        showedMovies={savedMovies}
        savedMovies={allSavedMovies}
        deleteMovie={deleteSavedMovie}
        isNothingFound={isNothingFound}
      />
    </>
  );
}
