import React, { useEffect } from "react";

const Tooltip = ({ isTooltipOpened, setIsTooltipOpened, image, text }) => {
  const handleClickOverlay = (e) => {
    // закрытие попапов по клику на фон
    if (e.currentTarget === e.target) {
      setIsTooltipOpened(false);
    }
  };

  const handleKeyEscape = (e) => {
    if (e.key === "Escape") {
      setIsTooltipOpened(false);
    }
  };

  useEffect(() => {
    // закрытие попапов клавишей esc
    if (isTooltipOpened) {
      document.addEventListener("keydown", handleKeyEscape);
    } else {
      document.removeEventListener("keydown", handleKeyEscape);
    }
  }, [isTooltipOpened]);
  const handleTooltipClose = () => {
    setIsTooltipOpened(false);
  };

  return (
    <div
      className={`tooltip ${isTooltipOpened ? "tooltip__opened" : ""}`}
      onClick={handleClickOverlay}
    >
      <div className="tooltip__container">
        <button
          className="tooltip__button"
          onClick={handleTooltipClose}
        ></button>
        <div
          className="tooltip__image"
          style={{
            backgroundImage: `url(${image})`,
          }}
        ></div>
        <p className="tooltip__text">{text}</p>
      </div>
    </div>
  );
};
export default Tooltip;
