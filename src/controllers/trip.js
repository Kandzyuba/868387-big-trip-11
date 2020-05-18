import SortComponent from "../components/sort.js";
import DayComponent from "../components/day.js";
import NoPointsComponent from "../components/no-points.js";
import TripDaysComponent from "../components/trip-days.js";
import {render, RenderPosition} from "../utils/render.js";
import PointController from "./point.js";


const renderPoints = (points, pointDays, onDataChange, onViewChange) => {

  pointDays.forEach((item, index) => {
    const tripDaysList = document.querySelector(`.trip-days`);
    render(tripDaysList, new DayComponent(new Date(item), 1 + index), RenderPosition.BEFOREEND);
    const lastDay = document.querySelector(`.day:last-child`);
    const pointContainer = lastDay.querySelector(`.trip-events__list`);

    let filteredArr = points.filter((element) => {
      return new Date(element.startPointDate).toDateString() === item;
    });

    filteredArr.map((element) => {
      const pointController = new PointController(pointContainer, onDataChange, onViewChange);
      pointController.render(element);
    });
  });
};

export default class TripController {
  constructor(container) {
    this._container = container;
    this._points = [];
    this._showedPointControllers = [];
    this._tripDays = new TripDaysComponent();
    this._sortComponent = new SortComponent();
    this._onDataChange = this._onDataChange.bind(this);
    // this._onViewChange = this._onViewChange.bind(this);

  }

  render(points) {
    this._points = points;
    this._travelDays = [...new Set(points.map((item) => new Date(item.startPointDate).toDateString()))];

    const container = this._container;
    render(container, this._sortComponent, RenderPosition.AFTERBEGIN);
    render(container, this._tripDays, RenderPosition.BEFOREEND);
    const tripEventsContainer = document.querySelector(`.trip-events`);

    if (this._points.length === 0) {
      render(tripEventsContainer, new NoPointsComponent(), RenderPosition.BEFOREEND);

      return;
    }

    const newPoint = renderPoints(this._points, this._travelDays, this._onDataChange, this._onViewChange);
    this._showedPointControllers = this._showedPointControllers.concat(newPoint);
  }

  _onDataChange(pointController, oldData, newData) {
    const index = this._points.findIndex((item) => item === oldData);

    if (index === -1) {
      return;
    }

    this._points = [].concat(this._points.slice(0, index), newData, this._points.slice(index + 1));

    pointController.render(this._points[index]);
  }

  // _onViewChange() {
  //   this._showedPointControllers.forEach((item) => item.setDefaultView());
  // }
}
