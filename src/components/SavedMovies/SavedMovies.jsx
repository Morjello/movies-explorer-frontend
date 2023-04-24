import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

export default function SavedMovies() {
  return (
    <>
      <SearchForm />
      <FilterCheckbox />
      <MoviesCardList />
    </>
  );
}