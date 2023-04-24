import { Link, useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  return (
    <section className="not-found-page">
      <h3 className="not-found-page__title">404</h3>
      <p className="not-found-page__subtitle">Страница не найдена</p>
      <p className="not-found-page__link" onClick={goBack}>
        Назад
      </p>
    </section>
  );
}
