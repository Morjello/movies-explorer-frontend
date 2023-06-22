import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContest";
import useInput from "../../hooks/useInput";
import Error from "../Error/Error";
import {
  ERROR_EMAIL_OR_PASS,
  ERROR_EMPTY_INPUT,
  ERROR_INVALID_EMAIL,
  ERROR_MAX_LENGTH,
  ERROR_MIN_LENGTH,
  ERROR_UPDATE_PROFILE,
  SUCCESS__UPDATE_PROFILE,
} from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { mainApi } from "../../utils/MainApi";
import successImg from "../../images/Success.jpg";
import failImg from "../../images/Fail.png";

export default function Profile({
  setLoggedIn,
  setIsFetching,
  setCurrentUser,
  setTooltipMessage,
  setIsTooltipOpened,
}) {
  const currentUser = useContext(CurrentUserContext);
  const navigate = useNavigate();
  const name = useInput(currentUser.name, {
    isEmpty: false,
    minLength: 2,
    maxLength: 40,
  });
  const email = useInput(currentUser.email, {
    isEmpty: false,
    minLength: 2,
    maxLength: 40,
    isEmail: true,
  });

  const handleUpdateUser = async ({ email, name }) => {
    // обновление данных пользователя
    try {
      setIsFetching(true);
      const newUserData = await mainApi.updateUser(email, name);
      setCurrentUser(newUserData);
      setIsTooltipOpened(true);
      setTooltipMessage({
        image: successImg,
        text: SUCCESS__UPDATE_PROFILE,
      });
    } catch (err) {
      setIsTooltipOpened(true);
      if (err === 409) {
        setTooltipMessage({
          image: failImg,
          text: ERROR_EMAIL_OR_PASS,
        });
      }
      setTooltipMessage({ image: failImg, text: ERROR_UPDATE_PROFILE });
    } finally {
      setIsFetching(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateUser({
      email: email.value,
      name: name.value,
    });
  };

  const showErrors = () => {
    if ((name.isDirty || email.isDirty) && (name.isEmpty || email.isEmpty))
      return <Error errorMessage={ERROR_EMPTY_INPUT} />;
    if (
      (name.isDirty || email.isDirty) &&
      (name.minLengthError || email.minLengthError)
    )
      return <Error errorMessage={ERROR_MIN_LENGTH} />;
    if (
      (name.isDirty || email.isDirty) &&
      (name.maxLengthError || email.maxLengthError)
    )
      return <Error errorMessage={ERROR_MAX_LENGTH} />;
    if (email.isDirty && email.emailError)
      return <Error errorMessage={ERROR_INVALID_EMAIL} />;
  };

  const disableEditButton = () => {
    if (
      !name.inputValid ||
      !email.inputValid ||
      name.value === currentUser.name ||
      email.value === currentUser.email
    )
      return true;
    return false;
  };

  // выход из аккаунта
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("allMovies");
    localStorage.removeItem("movieQuery");
    localStorage.removeItem("isShortMovie");
    setLoggedIn(false);
    navigate("/", { replace: true });
  };

  return (
    <section className="profile">
      <h3 className="profile__title">{`Привет, ${currentUser.name}!`}</h3>
      <form action="profile" className="profile__form" onSubmit={handleSubmit}>
        <div className="profile__box">
          <p className="profile__text">Имя</p>
          <input
            className="profile__input"
            onChange={(e) => name.onChange(e)}
            onBlur={(e) => name.onBlur(e)}
            value={name.value}
            type="text"
            id="name"
            name="name"
          ></input>
        </div>
        <div className="profile__line"></div>
        <div className="profile__box">
          <p className="profile__text">E-mail</p>
          <input
            className="profile__input"
            onChange={(e) => email.onChange(e)}
            onBlur={(e) => email.onBlur(e)}
            value={email.value}
            type="email"
            id="email"
            name="email"
          ></input>
        </div>
        <div className="error__container">{showErrors()}</div>
        <button
          className={`profile__edit-button ${
            disableEditButton() && "profile__edit-button_disabled"
          }`}
          disabled={disableEditButton()}
        >
          Редактировать
        </button>
        <button className="profile__logout-button" onClick={handleLogout}>
          Выйти из аккаунта
        </button>
      </form>
    </section>
  );
}
