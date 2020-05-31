import AbstractSmartComponent from "./abstract-smart-component.js";
import {sortTypes} from "../utils/common.js";

const createSortTemplate = (type) => {
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      <span class="trip-sort__item  trip-sort__item--day">Day</span>

      <div class="trip-sort__item  trip-sort__item--event">
        <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" ${type === sortTypes.EVENT ? `checked` : ``}>
        <label class="trip-sort__btn" data-type="${sortTypes.EVENT}" for="sort-event">Event</label>
      </div>

      <div class="trip-sort__item  trip-sort__item--time">
        <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time" ${type === sortTypes.TIME ? `checked` : ``}>
        <label class="trip-sort__btn" data-type="${sortTypes.TIME}" for="sort-time">
          Time
          <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
            <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
          </svg>
        </label>
      </div>

      <div class="trip-sort__item  trip-sort__item--price">
        <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" ${type === sortTypes.PRICE ? `checked` : ``}>
        <label class="trip-sort__btn" data-type="${sortTypes.PRICE}" for="sort-price">
          Price
          <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
            <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
          </svg>
        </label>
      </div>

      <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
    </form>`
  );
};

export default class Info extends AbstractSmartComponent {
  constructor() {
    super();
    this._handler = null;
    this._actualSortType = sortTypes.EVENT;
  }

  getTemplate() {
    return createSortTemplate(this._actualSortType);
  }

  recoveryListeners() {
    this.setSortTypeHandler(this._handler);
  }

  setSortTypeHandler(handler) {
    this._handler = handler;
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `LABEL`) {
        return;
      }

      const selectedType = evt.target.dataset.type;

      if (this._actualSortType === selectedType) {
        return;
      } else {
        this._actualSortType = selectedType;
        handler(this._actualSortType);
        this.rerender();
      }
    });
  }
}
