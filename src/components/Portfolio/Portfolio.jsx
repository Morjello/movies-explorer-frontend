export default function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <a
        href="https://github.com/Morjello/how-to-learn"
        target="_blank"
        rel="noreferrer"
        className="portfolio__link"
      >
        Статичный сайт
        <div className="portfolio__icon"></div>
      </a>
      <a
        href="https://morjello.github.io/russian-travel/"
        target="_blank"
        rel="noreferrer"
        className="portfolio__link"
      >
        Адаптивный сайт
        <div className="portfolio__icon"></div>
      </a>
      <a
        href="https://morjello.github.io/mesto/"
        target="_blank"
        rel="noreferrer"
        className="portfolio__link"
      >
        Одностраничное приложение
        <div className="portfolio__icon"></div>
      </a>
    </section>
  );
}
