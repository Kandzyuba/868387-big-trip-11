import InformationComponent from '../components/information.js';
import {RenderPosition, render, replace} from '../utils/render.js';

export default class InfoController {
  constructor(container, pointsModel) {
    this._container = container;
    this._pointsModel = pointsModel;

    this._infoComponent = null;

    this._onDataChange = this._onDataChange.bind(this);

    this._pointsModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const container = this._container;

    const oldComponent = this._infoComponent;

    this._infoComponent = new InformationComponent(this._pointsModel);

    if (oldComponent) {
      replace(this._infoComponent, oldComponent);
    } else {
      render(container, this._infoComponent, RenderPosition.AFTERBEGIN);
    }
  }

  _onDataChange() {
    this.render();
  }
}
