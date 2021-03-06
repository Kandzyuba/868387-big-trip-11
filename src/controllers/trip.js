import SortComponent from "../components/sort.js";
import DayComponent from "../components/day.js";
import NoPointsComponent from "../components/no-points.js";
import TripDaysComponent from "../components/trip-days.js";
import {render, RenderPosition} from "../utils/render.js";
import {sortTypes} from "../utils/common.js";
import PointController, {EventMode, newPoint} from "./point.js";


const renderPoints = (points, onDataChange, onViewChange, isDefaultSorting = true) => {

  const travelDays = isDefaultSorting ? [...new Set(points.map((item) => new Date(item.startPointDate).toDateString()))] : [true];
  const pointControllers = [];

  travelDays.forEach((item, index) => {
    const tripDaysList = document.querySelector(`.trip-days`);
    const dayComponent = isDefaultSorting ? new DayComponent(new Date(item), 1 + index) : new DayComponent();

    const filteredPoints = points.filter((element) => {
      return isDefaultSorting ? new Date(element.startPointDate).toDateString() === item : points;
    });

    filteredPoints.forEach((element) => {
      const pointController = new PointController(dayComponent.getElement().querySelector(`.trip-events__list`), onDataChange, onViewChange);
      pointController.render(element, EventMode.DEFAULT);
      pointControllers.push(pointController);
    });

    render(tripDaysList, dayComponent, RenderPosition.BEFOREEND);
  });

  return pointControllers;
};

export default class TripController {
  constructor(container, pointsModel, api) {
    this._container = container;
    this._pointsModel = pointsModel;
    this._showedPointControllers = [];
    this._api = api;

    this._tripDays = new TripDaysComponent();
    this._sortComponent = new SortComponent();
    this._creatingPoint = null;
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);

    this._pointsModel.setFilterChangeHandler(this._onFilterChange);
  }

  getPoints() {
    return this._pointsModel.getPoints();
  }

  render() {
    const points = this._pointsModel.getProcessedPoints();
    const container = this._container;

    if (points.length === 0) {
      render(container, new NoPointsComponent(), RenderPosition.BEFOREEND);

      return;
    }

    render(container, this._sortComponent, RenderPosition.AFTERBEGIN);
    render(container, this._tripDays, RenderPosition.BEFOREEND);

    this._showedPointControllers = renderPoints(points, this._onDataChange, this._onViewChange);
    this._sortComponent.setSortTypeHandler(this._onSortTypeChange);
  }

  createPoint() {
    const daysContainer = this._container.querySelector(`.trip-days`);
    if (this._creatingPoint) {
      return;
    }

    this._creatingPoint = new PointController(daysContainer, this._onDataChange, this._onViewChange);
    this._creatingPoint.render(newPoint, EventMode.CREATING);
    this._onViewChange();
  }

  hide() {
    this._tripDays.hide();
  }

  show() {
    this._tripDays.show();
  }

  _removePoints() {
    this._tripDays.getElement().innerHTML = ``;
    this._showedPointControllers.forEach((pointController) => pointController.remove());
    this._showedPointControllers = [];
  }

  _updatePoint() {
    this._removePoints();
    this._showedPointControllers = renderPoints(this._pointsModel.getProcessedPoints(), this._dayList, this._onDataChange, this._onViewChange);
    this._sortComponent.setSortTypeHandler(this._onSortTypeChange);
  }

  _onDataChange(pointController, oldData, newData) {
    if (oldData === newPoint) {
      this._creatingPoint = null;
      if (newData === null) {
        pointController.remove();
        this._updatePoint();
      } else {
        this._api.createPoint(newData)
        .then((pointModel) => {
          this._pointsModel.addPoint(pointModel);
          this._showedPointControllers = [].concat(pointController, this._showedPointControllers);
          this._updatePoints();
        }).catch(() => {
          pointController.getAnimation();
        });
      }
    } else if (newData === null) {
      this._api.deletePoint(oldData.id).then(() => {
        this._pointsModel.removePoint(oldData.id);
        this._updatePoints();
      }).catch(() => {
        pointController.getAnimation();
      });
    } else {
      this._api.updatePoint(oldData.id, newData)
      .then((pointsModel) => {
        const isSuccess = this._pointsModel.updatePoint(oldData.id, pointsModel);

        if (isSuccess) {
          pointController.render(pointsModel, EventMode.DEFAULT);
        }
      }).catch(() => {
        pointController.getAnimation();
      });
    }
  }

  _onViewChange() {
    this._showedPointControllers.forEach((item) => item.setDefaultView());
  }

  _onFilterChange() {
    this._updatePoint();
  }

  _onSortTypeChange(type) {
    let sortedPoints = [];
    let isDefaultSorting = false;
    const points = this._pointsModel.getProcessedPoints();

    switch (type) {
      case sortTypes.EVENT:
        sortedPoints = points.slice();
        isDefaultSorting = true;
        break;
      case sortTypes.TIME:
        sortedPoints = points.slice().sort((a, b) => (b.endPointDate - b.startPointDate) - (a.endPointDate - a.startPointDate));
        break;
      case sortTypes.PRICE:
        sortedPoints = points.slice().sort((a, b) => b.price - a.price);
        break;
    }
    this._removePoints();
    this._showedPointControllers = renderPoints(sortedPoints, this._onDataChange, this._onViewChange, isDefaultSorting);
  }
}
