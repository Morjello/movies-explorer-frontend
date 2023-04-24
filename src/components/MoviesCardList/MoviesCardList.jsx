import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList() {
  const location = useLocation();
  return (
    <section className="movies">
      <ul className="movies__table">
        <MoviesCard></MoviesCard>
        <MoviesCard></MoviesCard>
        <MoviesCard></MoviesCard>
        <MoviesCard></MoviesCard>
        <MoviesCard></MoviesCard>
        <MoviesCard></MoviesCard>
        <MoviesCard></MoviesCard>
        <MoviesCard></MoviesCard>
        <MoviesCard></MoviesCard>
        <MoviesCard></MoviesCard>
        <MoviesCard></MoviesCard>
        <MoviesCard></MoviesCard>
      </ul>
      <div className="movies__container">
        <button
          className={`movies__button ${
            location.pathname === "/saved-movies" ? "movies__button_none" : ""
          }`}
        >
          Ещё
        </button>
      </div>
    </section>
  );
}
