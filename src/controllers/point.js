import moment from "moment";
import PointComponent from "../components/point.js";
import EditComponent from "../components/edit.js";
import {replace, render, RenderPosition, remove} from "../utils/render.js";
import Point from "../models/point-model.js";
import Store from '../models/store-model.js';

export const EventMode = {
  DEFAULT: `default`,
  EDIT: `edit`,
  CREATING: `creating`
};

const ANIMATION_TIMEOUT = 600;

export const newPoint = {
  id: String(Date.now() + Math.random()),
  type: `Bus`,
  city: ``,
  price: 0,
  startPointDate: new Date(),
  endPointDate: new Date(),
  offers: [],
  description: ``,
  photos: [],
  isFavorite: false,
  isNew: true
};

const parseFormData = (formData) => {
  const selectedOffers = [
    ...document.querySelectorAll(`.event__offer-checkbox:checked + label[for^="event"]`)
  ];

  const destination = Store.getDestinations().find((city) => city.name === formData.get(`event-destination`));

  return new Point({
    'base_price': Number(formData.get(`event-price`)),
    'date_from': new Date(
        moment(formData.get(`event-start-time`), `DD/MM/YYYY HH:mm`).valueOf()
    ).toISOString(),
    'date_to': new Date(
        moment(formData.get(`event-end-time`), `DD/MM/YYYY HH:mm`).valueOf()
    ).toISOString(),
    'destination': {
      'description': destination.description,
      'name': destination.name,
      'pictures': destination.pictures
    },
    'id': `0`,
    'is_favorite': formData.get(`event-favorite`) ? true : false,
    'offers': selectedOffers.map((offer) => ({
      'title': offer.querySelector(`.event__offer-title`).textContent,
      'price': Number(offer.querySelector(`.event__offer-price`).textContent)
    })),
    'type': formData.get(`event-current-type`)
  });
};

export default class PointController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._pointComponent = null;
    this._editComponent = null;

    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._EventMode = EventMode.DEFAULT;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(point, mode) {
    const oldPoint = this._pointComponent;
    const oldEditPoint = this._editComponent;
    this._EventMode = mode;

    this._pointComponent = new PointComponent(point);
    this._editComponent = new EditComponent(point);

    const container = this._container;

    render(container, this._pointComponent, RenderPosition.BEFOREEND);

    this._pointComponent.setEditButtonClickHandler(() => {
      this._replacePointToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._editComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      const formData = this._editComponent.getData();
      const data = parseFormData(formData);

      this._editComponent.disableForm();
      this._editComponent.setData({
        saveButtonText: `Saving...`,
      });
      this._onDataChange(this, point, data);
      this._editComponent.activeForm();
      this._replaceEditToPoint();
    });

    this._editComponent.setClickHandler(() => {
      this._replaceEditToPoint();
    });

    this._editComponent.setCancelHandler(() => {
      this._replaceEditToPoint();
    });

    this._editComponent.setFavoritesButtonClickHandler(() => {
      const clonePoint = Point.clone(point);
      clonePoint.isFavorite = !clonePoint.isFavorite;

      this._onDataChange(this, point, clonePoint);

      this._EventMode = EventMode.EDIT;
    });

    this._editComponent.setDeleteClickHandler(() => {
      this._editComponent.setData({
        deleteButtonText: `Deleting...`,
      });

      this._onDataChange(this, point, null);
    });

    switch (mode) {
      case EventMode.DEFAULT:
        if (oldPoint && oldEditPoint) {
          replace(this._pointComponent, oldPoint);
          replace(this._editComponent, oldEditPoint);
        } else {
          render(container, this._pointComponent, RenderPosition.BEFOREEND);
        }
        break;
      case EventMode.CREATING:
        if (oldEditPoint && oldPoint) {
          remove(oldPoint);
          remove(oldEditPoint);
        }
        document.addEventListener(`keydown`, this._onEscKeyDown);
        render(container, this._editComponent, RenderPosition.AFTERBEGIN);
        break;
    }
  }

  setDefaultView() {
    if (this._EventMode !== EventMode.DEFAULT) {
      this._replaceEditToPoint();
    }
  }

  getAnimation() {
    this._editComponent.getElement().style.animation = `shake ${ANIMATION_TIMEOUT / 1000}s`;
    this._pointComponent.getElement().style.animation = `shake ${ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      this._editComponent.getElement().style.animation = ``;
      this._pointComponent.getElement().style.animation = ``;

      this._editComponent.setData({
        saveButtonText: `Save`,
        deleteButtonText: `Delete`,
      });
    }, ANIMATION_TIMEOUT);
  }


  _replacePointToEdit() {
    this._onViewChange();
    replace(this._editComponent, this._pointComponent);
    this._EventMode = EventMode.EDIT;
  }

  _replaceEditToPoint() {
    replace(this._pointComponent, this._editComponent);
    this._EventMode = EventMode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      if (this._EventMode === EventMode.CREATING) {
        this._onDataChange(this, newPoint, null);
      }
      this._replaceEditToPoint();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  remove() {
    remove(this._editComponent);
    remove(this._pointComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }
}
