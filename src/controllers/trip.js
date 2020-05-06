import SortComponent from "../components/sort.js";
import DayComponent from "../components/day.js";
import PointComponent from "../components/point.js";
import EditComponent from "../components/edit.js";
import TripDaysComponent from "../components/trip-days.js";
import {replace, render, RenderPosition} from "../utils/render.js";


const renderPoints = (points) => {
  const travelDays = [...new Set(points.map((item) => new Date(item.startPointDate).toDateString()))];

  travelDays.forEach((item, index) => {
    const tripDaysList = document.querySelector(`.trip-days`);
    render(tripDaysList, new DayComponent(new Date(item), 1 + index), RenderPosition.BEFOREEND);
    const lastDay = document.querySelector(`.day:last-child`);
    const pointContainer = lastDay.querySelector(`.trip-events__list`);

    let filteredArr = points.filter((element) => {
      return new Date(element.startPointDate).toDateString() === item;
    });

    filteredArr.forEach((element) => {
      const onEditButtonClick = () => {
        replace(editComponent, pointComponent);
      };

      const onEditFormSubmit = (evt) => {
        evt.preventDefault();
        replace(pointComponent, editComponent);
      };

      const pointComponent = new PointComponent(element);

      pointComponent.setEditButtonClickHandler(onEditButtonClick);

      const editComponent = new EditComponent(element);

      editComponent.setSubmitHandler(onEditFormSubmit);

      render(pointContainer, pointComponent, RenderPosition.BEFOREEND);
    });
  });
};


export default class TripController {
  constructor(container) {
    this._container = container;
    this._tripDays = new TripDaysComponent();
    this._sortComponent = new SortComponent();
  }

  render(points) {
    const container = this._container;
    render(container, this._sortComponent, RenderPosition.AFTERBEGIN);
    render(container, this._tripDays, RenderPosition.BEFOREEND);
    renderPoints(points);
  }
}
