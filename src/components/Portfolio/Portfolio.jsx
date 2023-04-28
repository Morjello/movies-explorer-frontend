export default function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolie__list">
        <li className="portfolio__item">
          <a
            href="https://morjello.github.io/how-to-learn/"
            target="_blank"
            rel="noreferrer"
            className="portfolio__link"
          >
            Статичный сайт
          </a>
          <div className="portfolio__icon"></div>
        </li>
        <li className="portfolio__item">
          <a
            href="https://morjello.github.io/russian-travel/"
            target="_blank"
            rel="noreferrer"
            className="portfolio__link"
          >
            Адаптивный сайт
          </a>
          <div className="portfolio__icon"></div>
        </li>
        <li className="portfolio__item">
          <a
            href="https://morjello.github.io/mesto/"
            target="_blank"
            rel="noreferrer"
            className="portfolio__link"
          >
            Одностраничное приложение
          </a>
          <div className="portfolio__icon"></div>
        </li>
      </ul>
    </section>
  );
}
