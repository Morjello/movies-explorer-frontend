import SearchForm from "../SearchForm/SearchForm";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

export default function Movies() {
  return (
    <section className="moveis">
      <SearchForm />
      <FilterCheckbox />
      <MoviesCardList />
    </section>
  );
}
