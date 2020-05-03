import InfoComponent from "./components/information.js";
import CostComponent from "./components/cost.js";
import MenuComponent from "./components/menu.js";
import FiltersComponent from "./components/filters.js";
import SortComponent from "./components/sort.js";
import TripDaysComponent from "./components/trip-days.js";
import DayComponent from "./components/day.js";
import PointComponent from "./components/point.js";
import EditComponent from "./components/edit.js";
import {pointData, totalCost, travelDays} from "./mock/mock.js";
import {render, RenderPosition} from "./helpers/utils.js";

const tripMainContainer = document.querySelector(`.trip-main`);
const tripControlsContainer = document.querySelector(`.trip-controls`);
const tripEventsContainer = document.querySelector(`.trip-events`);

render(tripMainContainer, new InfoComponent().getElement(), RenderPosition.AFTERBEGIN);
const tripInfoContainer = document.querySelector(`.trip-info`);

render(tripInfoContainer, new CostComponent(totalCost).getElement(), RenderPosition.BEFOREEND);

render(tripControlsContainer, new MenuComponent().getElement(), RenderPosition.BEFOREEND);
render(tripControlsContainer, new FiltersComponent().getElement(), RenderPosition.BEFOREEND);
render(tripEventsContainer, new SortComponent().getElement(), RenderPosition.AFTERBEGIN);

// render(tripEventsContainer, new EditComponent(editData).getElement(), RenderPosition.BEFOREEND);

render(tripEventsContainer, new TripDaysComponent().getElement(), RenderPosition.BEFOREEND);

const renderPoint = (pointListElement, element) => {
  const onEditButtonClick = () => {
    pointListElement.replaceChild(editComponent.getElement(), pointComponent.getElement());
  };

  const onEditFormSubmit = (evt) => {
    evt.preventDefault();
    pointListElement.replaceChild(pointComponent.getElement(), editComponent.getElement());
  };

  const pointComponent = new PointComponent(element);

  pointComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, onEditButtonClick);


  const editComponent = new EditComponent(element);

  editComponent.getElement().querySelector(`form`).addEventListener(`submit`, onEditFormSubmit);

  render(pointListElement, pointComponent.getElement(), RenderPosition.BEFOREEND);

};

travelDays.forEach((item, index) => {
  const tripDaysList = document.querySelector(`.trip-days`);
  render(tripDaysList, new DayComponent(new Date(item), 1 + index).getElement(), RenderPosition.BEFOREEND);
  const lastDay = document.querySelector(`.day:last-child`);
  const pointContainer = lastDay.querySelector(`.trip-events__list`);

  let filteredArr = pointData.filter((element) => {
    return new Date(element.startPointDate).toDateString() === item;
  });

  filteredArr.forEach((element) => {
    renderPoint(pointContainer, element);
  });
});

