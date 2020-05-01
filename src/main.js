import {createInfoTemplate} from "./components/information.js";
import {createCostTemplate} from "./components/cost.js";
import {createMenuTemplate} from "./components/menu.js";
import {createFiltersTemplate} from "./components/filters.js";
import {createSortTemplate} from "./components/sort.js";
import {createTripDaysTemplate} from "./components/trip-days.js";
import {createDayTemplate} from "./components/day.js";
import {createPointTemplate} from "./components/point.js";
import {createEditEventTemplate} from "./components/edit.js";
import {createPointOffers, createEditOffers} from "./components/offers.js";
import {pointData, editData, totalCost, travelDays} from "./mock/mock.js";
import {getRandomItemArr} from "./helpers/utils.js";

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

render(tripEventsContainer, createEditEventTemplate(editData), `beforeend`);


const editOffersContainer = document.querySelector(`.event__available-offers`);

editData.offers.forEach(function (element, index) {
  const checkStatus = [true, false];
  let status = String;
  if (getRandomItemArr(checkStatus) === true) {
    status = `checked`;
  } else {
    status = ``;
  }

  render(editOffersContainer, createEditOffers(element, index + 1, status), `beforeend`);
});


// const editOffers = [];


// for (let i = 0; i < data.length; i++) {
//   if (getRandomItemArr(checkStatus) === true) {
//     status = `checked`;
//   } else {
//     status = ``;
//   }

//   editOffers.push();
// }


render(tripEventsContainer, createTripDaysTemplate(), `beforeend`);

travelDays.forEach(function (item, index) {
  const tripDaysList = document.querySelector(`.trip-days`);
  render(tripDaysList, createDayTemplate(new Date(item), 1 + index), `beforeend`);
  const lastDay = document.querySelector(`.day:last-child`);
  const pointContainer = lastDay.querySelector(`.trip-events__list`);

  pointData.forEach(function (element) {
    if (element.startPointDate.toDateString() === item) {
      render(pointContainer, createPointTemplate(element), `beforeend`);

      const offersContainer = lastDay.querySelector(`.trip-events__item:last-child .event__selected-offers`);

      element.offers.forEach(function (object) {
        render(offersContainer, createPointOffers(object), `beforeend`);
      });
    }
  });
});
