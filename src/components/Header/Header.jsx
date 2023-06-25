import React from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

export default function Header({ loggedIn }) {
  const location = useLocation();

  return (
    <header className={`header ${location.pathname !== "/" && "header_main"}`}>
      <Link to="/" className="header__logo"></Link>
      <div className="header__container">
        <Routes>
          {!loggedIn && (
            <Route
              path="/"
              element={
                <>
                  <div></div>
                  <div className="header__auth">
                    <Link to="/signup" className="header__register">
                      Регистрация
                    </Link>
                    <Link to="/signin" className="header__login">
                      Войти
                    </Link>
                  </div>
                </>
              }
            />
          )}
          {loggedIn && <Route path="/" element={<Navigation />} />}
          {loggedIn && <Route path="/movies" element={<Navigation />} />}
          {loggedIn && <Route path="/saved-movies" element={<Navigation />} />}
          {loggedIn && <Route path="/profile" element={<Navigation />} />}
        </Routes>
      </div>
    </header>
  );
}
