import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <section className="profile">
      <h3 className="profile__title">Привет, Виталий!</h3>
      <form action="profile" className="profile__form">
        <div className="profile__box">
          <p className="profile__text">Имя</p>
          <p className="profile__data">Виталий</p>
        </div>
        <div className="profile__line"></div>
        <div className="profile__box">
          <p className="profile__text">E-mail</p>
          <p className="profile__data">pochta@yandex.ru</p>
        </div>
        <button className="profile__edit-button">Редактировать</button>
        <Link to="/signin" className="profile__logout-button">
          Выйти из аккаунта
        </Link>
      </form>
    </section>
  );
}
