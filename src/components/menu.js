import AbstractComponent from "./abstract-component.js";


const createMenuTemplate = (article) => {
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      ${article.map((name) => {
      return (`
        <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">${name}</a>
      `);
    }).join(``)}
    </nav>`
  );
};

export default class Menu extends AbstractComponent {
  constructor(article) {
    super();

    this._article = article;
    this._element = null;
  }

  getTemplate() {
    return createMenuTemplate(this._article);
  }
}
