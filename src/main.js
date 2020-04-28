import {createInfoTemplate} from "./components/information.js";
import {createCostTemplate} from "./components/cost.js";
import {createMenuTemplate} from "./components/menu.js";
import {createFiltersTemplate} from "./components/filters.js";
import {createSortTemplate} from "./components/sort.js";
import {createTripDaysTemplate} from "./components/trip-days.js";
import {createDayTemplate} from "./components/day.js";
import {createPointTemplate} from "./components/point.js";
import {createEditEventTemplate} from "./components/edit.js";
import {createOffers} from "./components/offers.js";
import {mockData, totalCost, editPointData, travelDays, formatDate} from "./mock/mock.js";


const tripMainContainer = document.querySelector(`.trip-main`);
const tripControlsContainer = document.querySelector(`.trip-controls`);
const tripEventsContainer = document.querySelector(`.trip-events`);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(tripMainContainer, createInfoTemplate(), `afterbegin`);
const tripInfoContainer = document.querySelector(`.trip-info`);

render(tripInfoContainer, createCostTemplate(totalCost), `beforeend`);

render(tripControlsContainer, createMenuTemplate(), `beforeend`);
render(tripControlsContainer, createFiltersTemplate(), `beforeend`);
render(tripEventsContainer, createSortTemplate(), `afterbegin`);

render(tripEventsContainer, createEditEventTemplate(editPointData), `beforeend`);

render(tripEventsContainer, createTripDaysTemplate(), `beforeend`);

for (let i = 0; i < travelDays.length; i++) {
  let dateIndex = 1;
  const day = createDayTemplate(formatDate(new Date(travelDays[i]), `day`), formatDate(new Date(travelDays[i]), `datetimeDay`), dateIndex + i);
  const tripDaysList = document.querySelector(`.trip-days`);
  render(tripDaysList, day, `beforeend`);
  const pointContainer = document.querySelector(`.day:last-child .trip-events__list`);

  for (const element of mockData) {

    if (new Date(element.startDay).toDateString() === travelDays[i]) {
      render(pointContainer, createPointTemplate(element), `beforeend`);

      const offersContainer = document.querySelector(`.day:last-child .trip-events__item:last-child .event__selected-offers`);

      for (let j = 0; j <= element.offers.length - 1; j++) {
        render(offersContainer, createOffers(element.offers[j]), `beforeend`);
      }
    }
  }
}
