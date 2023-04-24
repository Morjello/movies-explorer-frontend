import { Link } from "react-router-dom";
import AuthForm from "../AuthForm/AuthForm";

export default function Login() {
  return (
    <AuthForm
      name="login"
      id="2"
      title="Рады видеть!"
      text="Ещё не зарегистрированы?"
      link="Регистрация"
    >
      <div>
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
        <span className="auth-form__input-error"></span>
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
        <span className="auth-form__input-error"></span>
      </div>
      <Link to="/movies" className="auth-form__button">
        Войти
      </Link>
    </AuthForm>
  );
}
