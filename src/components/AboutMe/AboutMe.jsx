import logo from "../../images/vitalik.png";

export default function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="about-project__title">Студент</h2>
      <div className="about-me__container">
        <div className="about-me__profile">
          <h3 className="about-me__name">Даниил</h3>
          <p className="about-me__job">Фронтенд-разработчик, 20 лет</p>
          <p className="about-me__description">
            Я родился в Воткинске, сейчас учусь в Казани на специальности
            взрывное дело. Я люблю слушать музыку, смотреть сериалы и читать
            книжки. Недавно начал кодить. После того, как пройду курс по
            веб-разработке и закончу университет, хочу устроиться на работу
            программистом.
          </p>
          <a
            href="https://github.com/Morjello"
            target="_blank"
            rel="noreferrer"
            className="about-me__git"
          >
            Github
          </a>
        </div>
        <img src={logo} alt="Фотография" className="about-me__photo" />
      </div>
    </section>
  );
}
