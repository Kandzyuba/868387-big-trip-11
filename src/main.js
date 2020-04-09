import {createInfoTemplate} from "./components/information.js";
import {createCostTemplate} from "./components/cost.js";
import {createMenuTemplate} from "./components/menu.js";
import {createFiltersTemplate} from "./components/filters.js";
import {createSortTemplate} from "./components/sort.js";
import {createTripDaysTemplate} from "./components/trip-days.js";
import {createDayTemplate} from "./components/day.js";
import {createPointTemplate} from "./components/point.js";
import {createEditEventTemplate} from "./components/edit.js";

const tripMainContainer = document.querySelector(`.trip-main`);
const tripControlsContainer = document.querySelector(`.trip-controls`);
const tripEventsContainer = document.querySelector(`.trip-events`);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(tripMainContainer, createInfoTemplate(), `afterbegin`);
const tripInfoContainer = document.querySelector(`.trip-info`);

render(tripInfoContainer, createCostTemplate(), `beforeend`);

render(tripControlsContainer, createMenuTemplate(), `beforeend`);
render(tripControlsContainer, createFiltersTemplate(), `beforeend`);
render(tripEventsContainer, createSortTemplate(), `afterbegin`);
render(tripEventsContainer, createEditEventTemplate(), `beforeend`);

render(tripEventsContainer, createTripDaysTemplate(), `beforeend`);
const tripDaysContainer = document.querySelector(`.trip-days`);

render(tripDaysContainer, createDayTemplate(), `afterbegin`);
const dayContainer = document.querySelector(`.day`);

render(dayContainer, createPointTemplate(), `beforeend`);
