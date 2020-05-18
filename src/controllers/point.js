import PointComponent from "../components/point.js";
import EditComponent from "../components/edit.js";
import {replace, render, RenderPosition} from "../utils/render.js";

const eventMode = {
  POINT: `default`,
  EDIT: `edit`
};

export default class PointController {
  constructor(pointContainer, onDataChange, onViewChange) {
    this._pointContainer = pointContainer;
    this._pointComponent = null;
    this._editComponent = null;
    this._onDataChange = onDataChange;
    // this._onViewChange = onViewChange;
    this._eventMode = eventMode.POINT;
    // this._onEskKeyDown = this._onEskKeyDown.bind(this);
  }

  render(point) {
    // const oldPoint = this._pointComponent;
    // const oldEdit = this._editComponent;
    this._pointComponent = new PointComponent(point);
    this._editComponent = new EditComponent(point);


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
    });

    // if (oldPoint && oldEdit) {
    //   replace(this._pointComponent, oldPoint);
    //   replace(this._editComponent, oldEdit);
    // } else {
    //   render(this._pointContainer, this._pointComponent, RenderPosition.BEFOREEND);
    // }

  }

  // setDefaultView() {
  //   if (this._eventMode !== eventMode.POINT) {
  //     this._replaceEditToTask();
  //   }
  // }

  _replacePointToEdit() {
    // this._onViewChange();
    replace(this._editComponent, this._pointComponent);

    this._eventMode = eventMode.EDIT;
  }

  _replaceEditToPoint() {
    replace(this._pointComponent, this._editComponent);
    this._eventMode = eventMode.POINT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._replaceEditToPoint();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
