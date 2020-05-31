import PointComponent from "../components/point.js";
import EditComponent from "../components/edit.js";
import {replace, render, RenderPosition, remove} from "../utils/render.js";
import {newPoint} from "../utils/common.js";

export const EventMode = {
  DEFAULT: `default`,
  EDIT: `edit`,
  CREATING: `creating`
};

export default class PointController {
  constructor(pointContainer, onDataChange, onViewChange) {
    this._pointContainer = pointContainer;
    this._pointComponent = null;
    this._editComponent = null;

    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._EventMode = EventMode.DEFAULT;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(point, mode) {
    this._EventMode = mode;
    const oldPoint = this._pointComponent;
    const oldEdit = this._editComponent;
    this._pointComponent = new PointComponent(point);
    this._editComponent = new EditComponent(point);

    const container = this._pointContainer.querySelector(`.trip-events__list`);

    render(this._pointContainer, this._pointComponent, RenderPosition.BEFOREEND);

    this._pointComponent.setEditButtonClickHandler(() => {
      this._replacePointToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._editComponent.setSubmitHandler(() => {
      this._replaceEditToPoint();
    });

    this._editComponent.setClickHandler(() => {
      this._replaceEditToPoint();
    });

    this._editComponent.setCancelHandler(() => {
      this._replaceEditToPoint();
    });

    this._editComponent.setFavoritesButtonClickHandler(() => {
      this._onDataChange(this, point, Object.assign({}, point, {
        favoriteFlag: !point.favoriteFlag
      }));
      this._EventMode = EventMode.EDIT;
    });

    // if (oldPoint && oldEdit) {
    //   replace(this._pointComponent, oldPoint);
    //   replace(this._editComponent, oldEdit);
    // } else {
    //   render(this._pointContainer, this._pointComponent, RenderPosition.BEFOREEND);
    // }

    switch (mode) {

      case EventMode.DEFAULT:
        console.log(mode);
        if (oldPoint && oldEdit) {
          replace(this._pointComponent, oldPoint);
          replace(this._editComponent, oldEdit);
        } else {
          render(container, this._pointComponent, RenderPosition.BEFOREEND);
        }
        break;
      case EventMode.CREATING:
        console.log(mode);
        if (oldEdit && oldPoint) {
          remove(oldPoint);
          remove(oldEdit);
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

  _replacePointToEdit() {
    this._onViewChange();
    replace(this._editComponent, this._pointComponent);
    console.log(this._editComponent);
    console.log(this._pointComponent);
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
