export default function FilterCheckbox() {
  return (
    <section className="filter-chechbox">
      <div className="filter-chechbox__box">
        <label className="filter-chechbox__label" htmlFor="checkbox">
          <input
            className="filter-chechbox__input"
            type="checkbox"
            id="checkbox"
          />
          <span className="filter-chechbox__slider">Короткометражки</span>
        </label>
      </div>
    </section>
  );
}
