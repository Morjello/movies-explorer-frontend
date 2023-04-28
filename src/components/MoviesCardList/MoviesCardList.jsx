import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList() {
  const location = useLocation();
  return (
    <section className="movies-list">
      <ul className="movies-list__table">
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
      <div className="movies-list__container">
        <button
          className={`movies-list__button ${
            location.pathname === "/saved-movies" ? "movies-list__button_none" : ""
          }`}
        >
          Ещё
        </button>
      </div>
    </section>
  );
}
