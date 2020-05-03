import {formatDate, createElement} from "../helpers/utils.js";

const createPointTemplate = (point) => {
  const {type, city, startPointDate, endPointDate, timePosition, price, offers} = point;

  const getOffers = (data) => {
    return data.map((offer) => {
      const {information, cost} = offer;

      return (`
          <li class="event__offer">
            <span class="event__offer-title">${information}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${cost}</span>
          </li>
          `);
    }).join(``);
  };

  const pointOffers = getOffers(offers);
  const formattedStartDate = formatDate(new Date(startPointDate), `point`);
  const formattedFinishDate = formatDate(new Date(endPointDate), `point`);
  const imgType = type.toLowerCase();

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${imgType}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} to ${city}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T10:30">${formattedStartDate}</time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-18T11:00">${formattedFinishDate}</time>
          </p>
          <p class="event__duration">${timePosition}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${pointOffers}
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class Point {
  constructor(point) {
    this._point = point;
    this._element = null;
  }

  getTemplate() {
    return createPointTemplate(this._point);
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
