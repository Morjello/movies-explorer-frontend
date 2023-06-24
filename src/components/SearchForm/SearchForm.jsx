import React, { useEffect, useState } from "react";
import useInput from "../../hooks/useInput";
import Error from "../Error/Error";
import { ERROR_KEY_WORD } from "../../utils/constants";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

export default function SearchForm({
  getMovies,
  movieQueryInStorage,
  isShortMovieInStorage,
  setShortMovieInStorage,
}) {
  const [isShortMovie, setShortMovie] = useState(false);
  const searchQuery = useInput(movieQueryInStorage, { isEmpty: false });

  useEffect(() => {
    setShortMovie(isShortMovieInStorage);
  }, [isShortMovieInStorage]);

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies(searchQuery.value, isShortMovie);
  };

  const showErrors = () => {
    if (searchQuery.isDirty && searchQuery.isEmpty)
      return <Error errorMessage={ERROR_KEY_WORD} />;
  };

  return (
    <form action="search" className="search-form" onSubmit={handleSubmit}>
      <div className="search-form__container">
        <input
          type="search"
          className="search-form__input"
          placeholder="Фильм"
          id="search"
          name="search"
          value={searchQuery.value || ""}
          onChange={(e) => searchQuery.onChange(e)}
          onBlur={(e) => searchQuery.onBlur(e)}
        />
        <button
          className="search-form__button"
          disabled={!searchQuery.inputValid}
        >
          Найти
        </button>
      </div>
      <div className="error__container">{showErrors()}</div>
      <FilterCheckbox
        isShortMovie={isShortMovie}
        setShortMovie={setShortMovie}
        setShortMovieInStorage={setShortMovieInStorage}
      />
    </form>
  );
}
