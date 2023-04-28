import logo from "../../images/vitalik.png";

export default function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="about-project__title">Студент</h2>
      <div className="about-me__container">
        <div className="about-me__profile">
          <h3 className="about-me__name">Виталий</h3>
          <p className="about-me__job">Фронтенд-разработчик, 30 лет</p>
          <p className="about-me__description">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
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
