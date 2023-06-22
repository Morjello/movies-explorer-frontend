export default function FilterCheckbox({ isShortMovie, setShortMovie }) {
  const handleClickCheckbox = (e) => {
    setShortMovie(e.target.checked);
  };

  return (
    <div className="filter-chechbox">
      <div className="filter-chechbox__box">
        <label className="filter-chechbox__label" htmlFor="checkbox">
          <input
            className={`filter-chechbox__input ${
              isShortMovie && "filter-chechbox__input_checked"
            }`}
            type="checkbox"
            id="checkbox"
            onClick={handleClickCheckbox}
          />
          <span className="filter-chechbox__slider">Короткометражки</span>
        </label>
      </div>
    </div>
  );
}
