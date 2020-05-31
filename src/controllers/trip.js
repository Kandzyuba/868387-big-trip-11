import SortComponent from "../components/sort.js";
import DayComponent from "../components/day.js";
import NoPointsComponent from "../components/no-points.js";
import TripDaysComponent from "../components/trip-days.js";
import {render, RenderPosition} from "../utils/render.js";
import {sortTypes, newPoint} from "../utils/common.js";
import PointController, {EventMode} from "./point.js";


const renderPoints = (points, onDataChange, onViewChange, isDefaultSorting = true) => {

  const travelDays = isDefaultSorting ? [...new Set(points.map((item) => new Date(item.startPointDate).toDateString()))] : [true];
  let pointControllers = [];

  travelDays.forEach((item, index) => {
    const tripDaysList = document.querySelector(`.trip-days`);
    const dayComponent = isDefaultSorting ? new DayComponent(new Date(item), 1 + index) : new DayComponent();
    render(tripDaysList, dayComponent, RenderPosition.BEFOREEND);
    const lastDay = document.querySelector(`.day:last-child`);
    const pointContainer = lastDay.querySelector(`.trip-events__list`);

    let daysArr = points.filter((element) => {
      return isDefaultSorting ? new Date(element.startPointDate).toDateString() === item : points;
    });

    const getDaysArrow = daysArr.map((element) => {
      const pointController = new PointController(pointContainer, onDataChange, onViewChange);
      pointController.render(element);
      return pointController;
    });

    pointControllers = pointControllers.concat(getDaysArrow);
    return pointControllers;
  });

  return pointControllers;
};

export default class TripController {
  constructor(container, pointsModel) {
    this._container = container;
    // this._point = [];
    this._pointsModel = pointsModel;
    this._showedPointControllers = [];


    this._tripDays = new TripDaysComponent();
    this._sortComponent = new SortComponent();
    this._creatingPoint = null;
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);

    this._pointsModel.setFilterChangeHandler(this._onFilterChange);
    this._dayList = [];
  }

  render() {
    const points = this._pointsModel.getProcessedPoints();
    const container = this._container;
    const tripEventsContainer = document.querySelector(`.trip-events`);

    if (points.length === 0) {
      render(tripEventsContainer, new NoPointsComponent(), RenderPosition.BEFOREEND);

      return;
    }

    render(container, this._sortComponent, RenderPosition.AFTERBEGIN);
    render(container, this._tripDays, RenderPosition.BEFOREEND);

    this._showedPointControllers = renderPoints(points, this._onDataChange, this._onViewChange);
    this._sortComponent.setSortTypeHandler(this._onSortTypeChange);
  }

  createPoint() {
    if (this._creatingPoint) {
      return;
    }

    this._creatingPoint = new PointController(this._container, this._onDataChange, this._onViewChange);
    this._creatingPoint.render(newPoint, EventMode.CREATING);
    console.log(this._creatingPoint);
    this._onViewChange();
  }

  _removePoints() {
    this._showedPointControllers.forEach((pointController) => pointController.remove());
    this._showedPointControllers = [];
    this._dayList = this._container.querySelector(`.trip-days`);
    this._dayList.innerHTML = ``;
  }

  _updatePoint() {
    this._removePoints();
    this._dayList = this._container.querySelector(`.trip-days`);
    this._showedPointControllers = renderPoints(this._pointsModel.getProcessedPoints(), this._dayList, this._onDataChange, this._onViewChange);
    // this._renderPoints(this._container.querySelector(`.trip-days`), this._pointsModel.getPoints().slice(0, count));
    this._sortComponent.setSortTypeHandler(this._onSortTypeChange);
  }

  _onDataChange(pointController, oldData, newData) {
    // const index = this._points.findIndex((item) => item === oldData);

    // const isSuccess = this._pointsModel.updatePoint(oldData.id, newData);
    // if (isSuccess) {
    //   pointController.render(newData);
    // }

    // if (index === -1) {
    //   return;
    // }

    // this._points = [].concat(this._points.slice(0, index), newData, this._points.slice(index + 1));

    // pointController.render(this._points[index]);
    // ---
    if (oldData === newPoint) {
      this._creatingPoint = null;
      if (newData === null) {
        pointController.remove();
        this._updatePoint();
      } else {
        this._pointsModel.addFilteredPoint(newData);
        pointController.render(newData, EventMode.DEFAULT);

        this._showedPointControllers = [].concat(pointController, this._pointControllers);
        this._updatePoint();
      }
    } else if (newData === null) {
      this._pointsModel._removePoints(oldData.id);
      this._updatePoint();
    } else {
      const isSuccess = this._pointsModel.updatePoint(oldData.id, newData);
      if (isSuccess) {
        pointController.render(newData);
      }
    }
  }

  _onViewChange() {
    this._showedPointControllers.forEach((item) => item.setDefaultView());
    console.log(this._showedPointControllers);
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