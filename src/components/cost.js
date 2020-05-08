import AbstractComponent from "./abstract-component.js";

const createCostTemplate = (cost) => {
  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
    </p>`
  );
};

export default class Cost extends AbstractComponent {
  constructor(cost) {
    super();
    this._cost = cost;
  }

  getTemplate() {
    return createCostTemplate(this._cost);
  }
}
