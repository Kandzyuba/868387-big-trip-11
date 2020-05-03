import {createElement} from "../helpers/utils.js";

const createCostTemplate = (cost) => {
  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
    </p>`
  );
};

export default class Cost {
  constructor(cost) {
    this._cost = cost;
    this._element = null;
  }

  getTemplate() {
    return createCostTemplate(this._cost);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
