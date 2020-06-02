import moment from "moment";
import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';
import {TRANSPORT_TYPES, ACTIVITY_TYPES, FragmentType, getInitialLetter, protectionPrices} from "../utils/common.js";
import AbstractSmartComponent from "./abstract-smart-component.js";
import Store from '../models/store-model.js';

const DefaultData = {
  deleteButtonText: `Delete`,
  saveButtonText: `Save`,
};

const createCitiesList = (cities, elem) => {
  return cities.map((cityName) => {
    return (`<option value="${cityName}" ${cityName === elem ? `selected` : ``}>${cityName}</option>`);
  }).join(``);
};

const createTypeGroup = (group) => {
  return group.map((type) => {
    return (`<div class="event__type-item">
      <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}"
      >
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${getInitialLetter(type)}</label>
    </div>`);
  }).join(`\n`);
};

const createEditEventTemplate = (editData, options) => {
  const {startPointDate, endPointDate, price, isFavorite, isNew} = editData;
  const {type, city, description, photos, offers, externalData} = options;
  const cities = Store.getDestinations().map((destination) => destination.name);
  const formattedStartDate = moment(startPointDate).format(`DD/MM/YY HH:mm`);
  const formattedFinishDate = moment(endPointDate).format(`DD/MM/YY HH:mm`);
  const citiesList = createCitiesList(cities, city);
  const favoriteTemplate = isFavorite ? `checked` : ``;
  const deleteButtonText = externalData.deleteButtonText;
  const saveButtonText = externalData.saveButtonText;

  const getEditOffers = (data) => {
    return data.map((offer) => {
      return (`
        <div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-${offer.title}" type="checkbox" name="event-${offer.title}"  ${offer.isChecked ? `checked` : ``}>
          <label class="event__offer-label" for="event-${offer.title}">
          <span class="event__offer-title">${offer.title}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
          </label>
        </div>`
      );
    }).join(``);
  };

  const editOffers = getEditOffers(offers);

  const getEditPhotos = (editPhotos) => {
    return editPhotos.map((element) => {
      return (`<img class="event__photo" src="${element.src}" alt="${element.description}">`);
    });
  };

  const photoTemplate = getEditPhotos(photos);

  return (
    `<li class="trip-events__item">
      <form class="trip-events__item  event  event--edit" action="#" method="post">
        <header class="event__header">
        <input class="visually-hidden" name="event-current-type" id="event-current-type-name" value="${type}">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Transfer</legend>
                ${createTypeGroup(TRANSPORT_TYPES)}
              </fieldset>

              <fieldset class="event__type-group">
                <legend class="visually-hidden">Activity</legend>
                ${createTypeGroup(ACTIVITY_TYPES)}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${getInitialLetter(type)} ${TRANSPORT_TYPES.includes(type) ? FragmentType.TRANSPORT : FragmentType.ACTIVITY}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city}" list="destination-list-1">
            <datalist id="destination-list-1">
              ${citiesList}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">
              From
            </label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formattedStartDate}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">
              To
            </label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formattedFinishDate}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">${saveButtonText}</button>
          <button class="event__reset-btn" type="reset">${isNew && `Cancel` || deleteButtonText}</button>
          <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${favoriteTemplate}>
          <label class="event__favorite-btn ${isNew && `visually-hidden` || ``}" for="event-favorite-1">
            <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
              <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
            </svg>
          </label>
          ${isNew ? `` : `<button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>`}

        </header>
        ${offers.length > 0 || description.length > 0 ? `<section class="event__details">
          ${offers.length >= 0 ? `<section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>

            <div class="event__available-offers">
              ${editOffers}
            </div>
          </section>` : ``}
          ${description.length > 0 ? `<section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${description}</p>
            ${photos.length > 0 ? `<div class="event__photos-container">
              <div class="event__photos-tape">
                ${photoTemplate}
              </div>
            </div>` : ``}
          </section>` : ``}
        </section>` : ``}
      </form>
    </li>`
  );
};

export default class Edit extends AbstractSmartComponent {
  constructor(data) {
    super();
    this._data = data;
    this._offers = data.offers;
    this._photos = data.photos;
    this._description = data.description;
    this._type = data.type;
    this._city = data.city;
    this._externalData = DefaultData;

    this._submitHandler = null;
    this._deleteButtonClickHandler = null;

    this._flatpickrStartDate = null;
    this._flatpickrEndDate = null;

    this._applyFlatpickr();
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createEditEventTemplate(this._data, {
      type: this._type,
      city: this._city,
      description: this._description,
      offers: this._offers,
      photos: this._photos,
      externalData: this._externalData
    });
  }

  recoveryListeners() {
    this.setSubmitHandler(this._submitHandler);
    this.setCancelHandler(this._cancelHandler);
    this.setClickHandler(this._clickHandler);
    this.setFavoritesButtonClickHandler(this._favoritesClickHandler);
    this.setDeleteClickHandler(this._deleteButtonClockHandler);
    this._subscribeOnEvents();
  }

  getData() {
    const form = this.getElement().querySelector(`.trip-events__item`);
    return new FormData(form);
  }

  setData(data) {
    this._externalData = Object.assign({}, DefaultData, data);
    this.rerender();
  }

  disableForm() {
    const form = this.getElement().querySelector(`.trip-events__item`);
    const elements = Array.from(form.elements);
    elements.forEach((item) => {
      item.readOnly = true;
    });
  }

  activeForm() {
    const form = this.getElement().querySelector(`.trip-events__item`);
    const elements = Array.from(form.elements);
    elements.forEach((item) => {
      item.readOnly = false;
    });
  }

  rerender() {
    super.rerender();
    this._applyFlatpickr();
  }

  removeElement() {
    if (this._flatpickrStartDate || this._flatpickrEndDate) {
      this._flatpickrStartDate.destroy();
      this._flatpickrEndDate.destroy();
      this._flatpickrStartDate = null;
      this._flatpickrEndDate = null;
      this._clickHandler = null;
    }

    super.removeElement();
  }

  setSubmitHandler(handler) {
    this.getElement().querySelector(`form`).addEventListener(`submit`, handler);
    this._submitHandler = handler;
  }

  setCancelHandler(handler) {
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, handler);
    this._cancelHandler = handler;
  }

  setClickHandler(handler) {
    const editPointButton = this.getElement().querySelector(`.event__rollup-btn`);
    if (editPointButton) {
      editPointButton.addEventListener(`click`, handler);
      this._clickHandler = handler;
    }
  }

  setFavoritesButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, handler);
    this._favoritesClickHandler = handler;
  }

  setDeleteClickHandler(handler) {
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, handler);
    this._deleteButtonClickHandler = handler;
  }

  _applyFlatpickr() {
    if (this._flatpickrStartDate || this._flatpickrEndDate) {
      this._flatpickrStartDate.destroy();
      this._flatpickrEndDate.destroy();
      this._flatpickrStartDate = null;
      this._flatpickrEndDate = null;
    }
    const element = this.getElement();
    const options = {
      allowInput: true,
      dateFormat: `d/m/y H:i`,
      minDate: this._data.startPointDate,
      enableTime: true
    };

    this._flatpickrStartDate = flatpickr(element.querySelector(`#event-start-time-1`), Object.assign({}, options, {defaultDate: this._data.startPointDate}));
    this._flatpickrEndDate = flatpickr(element.querySelector(`#event-end-time-1`), Object.assign({}, options, {defaultDate: this._data.endPointDate}));
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.event__type-list`).addEventListener(`change`, (evt) => {
      this._type = evt.target.value;
      this._offers = Store.getOffers().find((offer) => offer.type === this._type).offers;

      this.rerender();
    });

    element.querySelector(`.event__input--destination`).addEventListener(`change`, (evt) => {
      this._city = evt.target.value;
      this._photos = Store.getDestinations().find((destination) => destination.name === this._city).pictures;
      this._description = Store.getDestinations().find((destination) => destination.name === this._city).description;

      this.rerender();
    });

    element.querySelector(`.event__input--price`).addEventListener(`input`, (evt) => {
      evt.target.value = protectionPrices(evt.target.value);
    });
  }
}
