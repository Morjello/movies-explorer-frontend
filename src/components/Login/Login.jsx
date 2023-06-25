import AuthForm from "../AuthForm/AuthForm";
import useInput from "../../hooks/useInput";
import Error from "../Error/Error";
import {
  ERROR_EMPTY_INPUT,
  ERROR_INVALID_EMAIL,
  ERROR_MAX_LENGTH,
  ERROR_MIN_LENGTH,
} from "../../utils/constants";
export default function Login({ handleLoginUser }) {
  const email = useInput("", {
    isEmpty: false,
    minLength: 2,
    maxLength: 40,
    isEmail: true,
  });
  const password = useInput("", { isEmpty: false });

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLoginUser({
      email: email.value,
      password: password.value,
    });
  };

  const showErrors = () => {
    if (
      (email.isDirty || password.isDirty) &&
      (email.isEmpty || password.isEmpty)
    )
      return <Error errorMessage={ERROR_EMPTY_INPUT} />;
    if (email.isDirty && email.minLengthError)
      return <Error errorMessage={ERROR_MIN_LENGTH} />;
    if (email.isDirty && email.maxLengthError)
      return <Error errorMessage={ERROR_MAX_LENGTH} />;
    if (email.isDirty && email.emailError)
      return <Error errorMessage={ERROR_INVALID_EMAIL} />;
  };
  return (
    <AuthForm
      name="login"
      id="2"
      title="Рады видеть!"
      text="Ещё не зарегистрированы?"
      link="Регистрация"
      onSubmit={handleSubmit}
    >
      <div>
        <p className="auth-form__input-name">E-mail</p>
        <input
          onChange={(e) => email.onChange(e)}
          onBlur={(e) => email.onBlur(e)}
          value={email.value}
          type="email"
          id="email"
          name="email"
          className="auth-form__input"
        />
        <p className="auth-form__input-name">Пароль</p>
        <input
          onChange={(e) => password.onChange(e)}
          onBlur={(e) => password.onBlur(e)}
          value={password.value}
          type="password"
          id="password"
          name="password"
          className="auth-form__input"
        />
      </div>
      <div className="error__container">{showErrors()}</div>
      <button
        to="/movies"
        className={`auth-form__button ${
          (!email.inputValid || !password.inputValid) &&
          "auth-form__button_disabled"
        }`}
        disabled={!email.inputValid || !password.inputValid}
      >
        Войти
      </button>
    </AuthForm>
  );
}
