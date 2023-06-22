import { Link, useLocation } from "react-router-dom";

export default function AuthForm({
  name,
  id,
  title,
  children,
  text,
  link,
  onSubmit,
}) {
  const location = useLocation();
  return (
    <div className="auth-form">
      <div className="auth-form__box">
        <div className="auth-form__icon"></div>
        <h3 className="auth-form__title">{title}</h3>
        <form
          action="auth"
          className="auth-form__form"
          name={name}
          id={id}
          onSubmit={onSubmit}
        >
          <div className="auth-form__content">{children}</div>
          <div className="auth-form__container">
            <p className="auth-form__text">{text}</p>
            <Link
              to={location.pathname === "/signin" ? "/signup" : "/signin"}
              className="auth-form__link"
            >
              {link}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
