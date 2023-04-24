export default function SearchForm() {
  return (
    <form className="search-form">
      <div className="search-form__container">
        <input type="text" placeholder="Фильм" className="search-form__input" />
        <button className="search-form__button">Найти</button>
      </div>
    </form>
  );
}
