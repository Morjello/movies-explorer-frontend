import AuthForm from "../AuthForm/AuthForm";
import useInput from "../../hooks/useInput";
import Error from "../Error/Error";
import {
  ERROR_EMPTY_INPUT,
  ERROR_INVALID_EMAIL,
  ERROR_MAX_LENGTH,
  ERROR_MIN_LENGTH,
} from "../../utils/constants";

export default function Register({ handleRegisterUser }) {
  const name = useInput("", { isEmpty: false, minLength: 2, maxLength: 40 });
  const email = useInput("", {
    isEmpty: false,
    minLength: 2,
    maxLength: 40,
    isEmail: true,
  });
  const password = useInput("", { isEmpty: false });

  const handleSubmit = (event) => {
    event.preventDefault();
    handleRegisterUser({
      email: email.value,
      password: password.value,
      name: name.value,
    });
  };

  const showErrors = () => {
    if (
      (name.isDirty || email.isDirty || password.isDirty) &&
      (name.isEmpty || email.isEmpty || password.isEmpty)
    )
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

  return (
    <AuthForm
      name="register"
      id="1"
      title="Добро пожаловать!"
      text="Уже зарегистрированы?"
      link="Войти"
      onSubmit={handleSubmit}
    >
      <div>
        <p className="auth-form__input-name">Имя</p>
        <input
          onChange={(e) => name.onChange(e)}
          onBlur={(e) => name.onBlur(e)}
          value={name.value}
          type="text"
          id="name"
          name="name"
          className="auth-form__input"
        />
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
        className={`auth-form__button ${
          (!name.inputValid || !email.inputValid || !password.inputValid) &&
          "auth-form__button_disabled"
        }`}
        disabled={!name.inputValid || !email.inputValid || !password.inputValid}
      >
        Зарегистрироваться
      </button>
    </AuthForm>
  );
}
