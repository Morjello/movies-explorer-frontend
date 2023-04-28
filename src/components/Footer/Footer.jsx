export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__container">
        <p className="footer__text">© 2023</p>
        <div className="footer__cell">
          <a
            href="https://practicum.yandex.ru/"
            target="_blank"
            rel="noreferrer"
            className="footer__link"
          >
            Яндекс.Практикум
          </a>
          <a
            href="https://github.com/Morjello"
            target="_blank"
            rel="noreferrer"
            className="footer__link"
          >
            Github
          </a>
        </div>
      </div>
    </footer>
  );
}
