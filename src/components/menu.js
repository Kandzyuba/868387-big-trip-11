import AbstractComponent from "./abstract-component.js";

export const MenuItem = {
  TABLE: `control-table`,
  STATS: `control-stats`
};

const createMenuTemplate = () => {
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      <a id="control-table" class="trip-tabs__btn" href="#">Table</a>
      <a id="control-stats" class="trip-tabs__btn" href="#">Stats</a>
    </nav>`
  );
};

export default class Menu extends AbstractComponent {
  getTemplate() {
    return createMenuTemplate(this._article);
  }

  setActiveItem(selectedItem) {
    this.getElement().querySelectorAll(`.trip-tabs__btn`).forEach((item) => {
      if (item.id === selectedItem) {
        item.classList.add(`trip-tabs__btn--active`);
      } else {
        item.classList.remove(`trip-tabs__btn--active`);
      }
    });
  }

  setOnChange(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName !== `A`) {
        return;
      }
      evt.preventDefault();

      const menuItem = evt.target.id;

      handler(menuItem);
    });
  }
}
