
import InfoComponent from "./components/information.js";
import CostComponent from "./components/cost.js";
import MenuComponent from "./components/menu.js";

import FiltersComponent from "./components/filters.js";
import {pointData, totalCost} from "./mock/mock.js";
import TripController from "./controllers/trip.js";
import {render, RenderPosition} from "./utils/render.js";

const tripMainContainer = document.querySelector(`.trip-main`);
const tripControlsContainer = document.querySelector(`.trip-controls`);
const tripEventsContainer = document.querySelector(`.trip-events`);

render(tripMainContainer, new InfoComponent(), RenderPosition.AFTERBEGIN);
const tripInfoContainer = document.querySelector(`.trip-info`);

render(tripInfoContainer, new CostComponent(totalCost), RenderPosition.BEFOREEND);

render(tripControlsContainer, new MenuComponent(), RenderPosition.BEFOREEND);
render(tripControlsContainer, new FiltersComponent(), RenderPosition.BEFOREEND);

const tripController = new TripController(tripEventsContainer);

tripController.render(pointData);

