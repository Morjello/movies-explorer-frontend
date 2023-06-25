import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Menu from "../Menu/Menu";

export default function Navigation() {
  const location = useLocation();
  const [menuActive, setMenuActive] = useState(false);
  return (
    <>
      <div className="navigation">
        <Link
          to="/movies"
          className={`navigation__link ${
            location.pathname === "/movies" && "navigation__link_active"
          }`}
        >
          Фильмы
        </Link>
        <Link
          to="/saved-movies"
          className={`navigation__link ${
            location.pathname === "/saved-movies" && "navigation__link_active"
          }`}
        >
          Сохраненные фильмы
        </Link>
      </div>

      <Link to="/profile" className="navigation__account">
        <div className="navigation__account-icon"></div>
        <p className="navigation__account-text">Аккаунт</p>
      </Link>
      <div
        className="navigation__burger"
        onClick={() => setMenuActive(!menuActive)}
      ></div>
      <Menu active={menuActive} setActive={setMenuActive} />
    </>
  );
}
