export default function SearchForm() {
  return (
    <form action="search" className="search-form">
      <div className="search-form__container">
        <input
          type="text"
          className="search-form__input"
          placeholder="Фильм"
          id="search"
          name="search"
          minLength="2"
          maxLength="40"
          required
        />
        <button className="search-form__button">Найти</button>
      </div>
    </form>
  );
}
