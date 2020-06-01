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

    this._editComponent.setDeleteClickHandler(() => {
      this._onDataChange(this, point, null);
    });

    // if (oldPoint && oldEditPoint) {
    //   replace(this._pointComponent, oldPoint);
    //   replace(this._editComponent, oldEditPoint);
    // } else {
    //   render(this._pointContainer, this._pointComponent, RenderPosition.BEFOREEND);
    // }

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
