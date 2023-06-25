import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="not-found-page">
      <h3 className="not-found-page__title">404</h3>
      <p className="not-found-page__subtitle">Страница не найдена</p>
      <Link to="/signin" className="not-found-page__link">
        Назад
      </Link>
    </section>
  );
}
