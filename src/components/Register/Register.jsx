import { Link } from "react-router-dom";
import AuthForm from "../AuthForm/AuthForm";

export default function Register() {
  return (
    <AuthForm
      name="register"
      id="1"
      title="Добро пожаловать!"
      text="Уже зарегистрированы?"
      link="Войти"
    >
      <div>
        <p className="auth-form__input-name">Имя</p>
        <input
          type="text"
          id="name"
          name="name"
          className="auth-form__input"
          minLength="2"
          maxLength="40"
          required
        />
        <span className="auth-form__input_error"></span>
        <p className="auth-form__input-name">E-mail</p>
        <input
          type="email"
          id="email"
          name="email"
          className="auth-form__input"
          minLength="2"
          maxLength="40"
          required
        />
        <span className="auth-form__input_error"></span>
        <p className="auth-form__input-name">Пароль</p>
        <input
          type="password"
          id="password"
          name="password"
          className="auth-form__input"
          minLength="2"
          maxLength="200"
          required
        />
        <span className="auth-form__input_error"></span>
      </div>
      <Link to="/signin" className="auth-form__button">
        Зарегистрироваться
      </Link>
    </AuthForm>
  );
}
