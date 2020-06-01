
import InfoComponent from "./components/information.js";
import CostComponent from "./components/cost.js";
import MenuComponent from "./components/menu.js";
import FilterController from "./controllers/filter.js";
import {pointData, totalCost, mainArticles} from "./mock/mock.js";
import TripController from "./controllers/trip.js";
import {render, RenderPosition} from "./utils/render.js";
import PointsModel from "./models/points-model.js";

const tripMainContainer = document.querySelector(`.trip-main`);
const tripControlsContainer = document.querySelector(`.trip-controls`);
const tripEventsContainer = document.querySelector(`.trip-events`);

render(tripMainContainer, new InfoComponent(), RenderPosition.AFTERBEGIN);
const tripInfoContainer = document.querySelector(`.trip-info`);

render(tripInfoContainer, new CostComponent(totalCost), RenderPosition.BEFOREEND);

render(tripControlsContainer, new MenuComponent(mainArticles), RenderPosition.BEFOREEND);

const pointsModel = new PointsModel();
pointsModel.setPoints(pointData);

const tripController = new TripController(tripEventsContainer, pointsModel);

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, () => {
  tripController.createPoint();
});

const filterController = new FilterController(tripControlsContainer, pointsModel);
filterController.render();

tripController.render(pointData);
