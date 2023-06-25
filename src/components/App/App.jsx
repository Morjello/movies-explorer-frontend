import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import Profile from "../Profile/Profile";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Preloader from "../Preloader/Preloader";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import Tooltip from "../Tooltip/Tooltip";
import CurrentUserContext from "../../contexts/CurrentUserContest";
import { mainApi } from "../../utils/MainApi";
import failImg from "../../images/Fail.png";
import {
  ERROR_409,
  ERROR_EMAIL_OR_PASS,
  ERROR_GET_MOVIES,
  ERROR_UNKNOWN,
  MORE_MOVIES_ON_1279PX,
  MORE_MOVIES_ON_1920PX,
  MORE_MOVIES_ON_768PX,
  MOVIES_ON_1279PX,
  MOVIES_ON_1920PX,
  MOVIES_ON_768PX,
  SUCCESS_LOGIN,
  SUCCESS_REGISTRATION,
} from "../../utils/constants";
import successImg from "../../images/Success.jpg";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const footerPaths = // маршруты для отображения подвала
    location.pathname === "/" ||
    location.pathname === "/movies" ||
    location.pathname === "/saved-movies";
  const headerPaths = // маршруты для отображения шапки
    location.pathname === "/" ||
    location.pathname === "/movies" ||
    location.pathname === "/saved-movies" ||
    location.pathname === "/profile";

  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({}); // контекст пользователя
  const [isFetching, setIsFetching] = useState(false); // отображение крутилки
  const [isTooltipOpened, setIsTooltipOpened] = useState(false);
  const [tooltipMessage, setTooltipMessage] = useState({ image: "", text: "" });
  const [quantityMoviesOnPage, setQuantityMoviesOnPage] = useState(0); // количество отображаемых карточек на странице
  const [moreMovies, setMoreMovies] = useState(0); // количество карточек при клике "Еще"
  const [width, setWidth] = useState(window.innerWidth);
  const [savedMovies, setSavedMovies] = useState([]);

  const handleResize = (e) => {
    setWidth(e.target.innerWidth);
  };

  useEffect(() => {
    getQuantityMovies();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  const getQuantityMovies = () => {
    if (width <= 768) {
      setQuantityMoviesOnPage(MOVIES_ON_768PX);
      setMoreMovies(MORE_MOVIES_ON_768PX);
    } else if (width <= 1279) {
      setQuantityMoviesOnPage(MOVIES_ON_1279PX);
      setMoreMovies(MORE_MOVIES_ON_1279PX);
    } else {
      setQuantityMoviesOnPage(MOVIES_ON_1920PX);
      setMoreMovies(MORE_MOVIES_ON_1920PX);
    }
  };

  const getSavedMovies = async () => {
    try {
      setIsFetching(true);
      const savedMovies = await mainApi.getSavedMovie();
      setSavedMovies(savedMovies);
    } catch (err) {
      setIsTooltipOpened(true);
      setTooltipMessage({
        image: failImg,
        text: ERROR_GET_MOVIES,
      });
    } finally {
      setIsFetching(false);
    }
  };

  const getUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const userData = await mainApi.getUserData(token);
        if (userData) {
          setCurrentUser(userData);
          setLoggedIn(true);
          navigate("/movies", { replace: true });
        }
      }
    } catch (err) {
      setIsTooltipOpened(true);
      setTooltipMessage({ image: failImg, text: ERROR_UNKNOWN });
    }
  };

  const handleLoginUser = async ({ email, password }) => {
    // авторизация
    try {
      setIsFetching(true);
      const data = await mainApi.login(email, password);
      if (data.token) {
        const userData = await mainApi.getUserData(data.token);
        setCurrentUser(userData);
        setLoggedIn(true);
        setIsTooltipOpened(true);
        setTooltipMessage({
          image: successImg,
          text: SUCCESS_LOGIN,
        });
      }
      navigate("/movies", { replace: true });
    } catch {
      setIsTooltipOpened(true);
      setTooltipMessage({
        image: failImg,
        text: ERROR_EMAIL_OR_PASS,
      });
    } finally {
      setIsFetching(false);
    }
  };

  const handleRegisterUser = async ({ email, password, name }) => {
    //регистрация
    try {
      setIsFetching(true);
      await mainApi.register(email, password, name);
      handleLoginUser({ email, password });
      setIsTooltipOpened(true);
      setTooltipMessage({
        image: successImg,
        text: SUCCESS_REGISTRATION,
      });
    } catch (err) {
      setIsTooltipOpened(true);
      if (err === 409) {
        setTooltipMessage({
          image: failImg,
          text: ERROR_409,
        });
      }
      setTooltipMessage({
        image: failImg,
        text: ERROR_EMAIL_OR_PASS,
      });
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    loggedIn && getSavedMovies();
  }, [loggedIn]);

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
        {headerPaths && <Header loggedIn={loggedIn} />}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/movies"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Movies
                  setIsTooltipOpened={setIsTooltipOpened}
                  setTooltipMessage={setTooltipMessage}
                  setIsFetching={setIsFetching}
                  quantityMoviesOnPage={quantityMoviesOnPage}
                  moreMovies={moreMovies}
                  savedMovies={savedMovies}
                  setSavedMovies={setSavedMovies}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <SavedMovies
                  setIsTooltipOpened={setIsTooltipOpened}
                  setTooltipMessage={setTooltipMessage}
                  setIsFetching={setIsFetching}
                  savedMovies={savedMovies}
                  setSavedMovies={setSavedMovies}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Profile
                  setLoggedIn={setLoggedIn}
                  setIsFetching={setIsFetching}
                  setCurrentUser={setCurrentUser}
                  setIsTooltipOpened={setIsTooltipOpened}
                  setTooltipMessage={setTooltipMessage}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signup"
            element={<Register handleRegisterUser={handleRegisterUser} />}
          />
          <Route
            path="/signin"
            element={<Login handleLoginUser={handleLoginUser} />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        {footerPaths && <Footer />}
        {isFetching && <Preloader />}
        {isTooltipOpened && (
          <Tooltip
            isTooltipOpened={isTooltipOpened}
            setIsTooltipOpened={setIsTooltipOpened}
            image={tooltipMessage.image}
            text={tooltipMessage.text}
          />
        )}
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
