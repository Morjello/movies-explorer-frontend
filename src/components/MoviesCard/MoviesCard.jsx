import React, { useState } from "react";
import { useLocation } from "react-router-dom";

export default function MoviesCard() {
  const location = useLocation();

  const [like, setLike] = useState(false);

  const handleLikeClick = () => {
    !like ? setLike(true) : setLike(false);
  };

  return (
    <li className="card">
      <div className="card__image"></div>
      <div className="card__cell">
        <div className="card__container">
          <h3 className="card__title">33 слова о дизайне</h3>
          <p className="card__duration">1ч 47м</p>
        </div>
        <div
          onClick={handleLikeClick}
          className={`card__like ${
            location.pathname === "/saved-movies" ? "card__like_delete" : ""
          } ${like ? "card__like_active" : ""}`}
        ></div>
      </div>
    </li>
  );
}
