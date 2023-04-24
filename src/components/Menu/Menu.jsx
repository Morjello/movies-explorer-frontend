import { Link, useLocation } from "react-router-dom";

export default function Menu({ active, setActive }) {
  const location = useLocation();

  const handleClickCloseIcon = () => {
    setActive(false);
  };

  return (
    <div className={`menu ${active ? "menu_active" : ""}`}>
      <div className="menu__overlay" />
      <div className="menu__close" onClick={handleClickCloseIcon}></div>
      <div className="menu__content">
        <div className="menu__container">
          <div className="menu__links">
            <Link
              to="/"
              onClick={handleClickCloseIcon}
              className={`menu__link ${
                location.pathname === "/" ? "menu__link_active" : ""
              }`}
            >
              Главная
            </Link>
            <Link
              to="/movies"
              onClick={handleClickCloseIcon}
              className={`menu__link ${
                location.pathname === "/movies" ? "menu__link_active" : ""
              }`}
            >
              Фильмы
            </Link>
            <Link
              to="/saved-movies"
              onClick={handleClickCloseIcon}
              className={`menu__link ${
                location.pathname === "/saved-movies" ? "menu__link_active" : ""
              }`}
            >
              Сохраненные фильмы
            </Link>
          </div>
          <Link
            to="/profile"
            onClick={handleClickCloseIcon}
            className="menu__account"
          >
            <div className="menu__account-icon"></div>
            <p className="menu__account-text">Аккаунт</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
