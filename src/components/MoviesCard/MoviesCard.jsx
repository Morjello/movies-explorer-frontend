import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import preview from "../../images/movie-img.png";

export default function MoviesCard() {
  const location = useLocation();

  const [like, setLike] = useState(false);

  const handleLikeClick = () => {
    !like ? setLike(true) : setLike(false);
  };

  return (
    <li className="card">
      <img src={preview} alt="Превью" className="card__image"></img>
      <div className="card__cell">
        <div className="card__container">
          <h3 className="card__title">33 слова о дизайне</h3>
          <p className="card__duration">1ч 47м</p>
        </div>
        <button
          onClick={handleLikeClick}
          className={`card__like ${
            location.pathname === "/saved-movies" ? "card__like_delete" : ""
          } ${like ? "card__like_active" : ""}`}
        ></button>
      </div>
    </li>
  );
}
