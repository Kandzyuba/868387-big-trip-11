import SortComponent from "../components/sort.js";
import DayComponent from "../components/day.js";
import NoPointsComponent from "../components/no-points.js";
import TripDaysComponent from "../components/trip-days.js";
import {render, RenderPosition} from "../utils/render.js";
import PointController from "./point.js";


const renderPoints = (points, onDataChange, onViewChange) => {

  const travelDays = [...new Set(points.map((item) => new Date(item.startPointDate).toDateString()))];
  let pointControllers = [];

  travelDays.forEach((item, index) => {
    const tripDaysList = document.querySelector(`.trip-days`);
    render(tripDaysList, new DayComponent(new Date(item), 1 + index), RenderPosition.BEFOREEND);
    const lastDay = document.querySelector(`.day:last-child`);
    const pointContainer = lastDay.querySelector(`.trip-events__list`);

    let daysArr = points.filter((element) => {
      return new Date(element.startPointDate).toDateString() === item;
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
  constructor(container) {
    this._container = container;
    this._points = [];
    this._showedPointControllers = [];
    this._tripDays = new TripDaysComponent();
    this._sortComponent = new SortComponent();
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);

  }

  render(points) {
    this._points = points;


    const container = this._container;
    render(container, this._sortComponent, RenderPosition.AFTERBEGIN);
    render(container, this._tripDays, RenderPosition.BEFOREEND);
    const tripEventsContainer = document.querySelector(`.trip-events`);

    if (this._points.length === 0) {
      render(tripEventsContainer, new NoPointsComponent(), RenderPosition.BEFOREEND);

      return;
    }

    this._showedPointControllers = renderPoints(this._points, this._onDataChange, this._onViewChange);
    console.log(this._showedPointControllers);
  }

  _onDataChange(pointController, oldData, newData) {
    const index = this._points.findIndex((item) => item === oldData);

    if (index === -1) {
      return;
    }

    this._points = [].concat(this._points.slice(0, index), newData, this._points.slice(index + 1));

    pointController.render(this._points[index]);
  }

  _onViewChange() {
    this._showedPointControllers.forEach((item) => item.setDefaultView());
    console.log(this._showedPointControllers);
  }
}
