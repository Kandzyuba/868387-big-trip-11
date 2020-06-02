import {getTimeDuration, FragmentType, TRANSPORT_TYPES, getInitialLetter} from "../utils/common.js";
import moment from "moment";
import AbstractComponent from "./abstract-component.js";

const createPointTemplate = (point) => {
  const {type, city, startPointDate, endPointDate, price, offers} = point;

  const getOffers = (data) => {
    return data.map((offer) => {

      return (`
          <li class="event__offer">
            <span class="event__offer-title">${offer.title}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
          </li>
          `);
    }).join(``);
  };

  const pointOffers = getOffers(offers);
  const startDatetime = moment(startPointDate).format(`YYYY-MM-DDThh:mm:ss`);
  const endDatetime = moment(endPointDate).format(`YYYY-MM-DDThh:mm:ss`);
  const formattedStartDate = moment(startPointDate).format(`HH:mm`);
  const formattedFinishDate = moment(endPointDate).format(`HH:mm`);
  const timeDuration = getTimeDuration(endPointDate - startPointDate);
  const imgType = type.toLowerCase();

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${imgType}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${getInitialLetter(type)}  ${TRANSPORT_TYPES.includes(type) ? FragmentType.TRANSPORT : FragmentType.ACTIVITY} ${city}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${startDatetime}">${formattedStartDate}</time>
            &mdash;
            <time class="event__end-time" datetime="${endDatetime}">${formattedFinishDate}</time>
          </p>
          <p class="event__duration">${timeDuration}</p>
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

export default class Point extends AbstractComponent {
  constructor(point) {
    super();
    this._point = point;
  }

  getTemplate() {
    return createPointTemplate(this._point);
  }

  setEditButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, handler);
  }
}
