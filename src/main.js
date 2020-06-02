
// import InfoComponent from "./components/information.js";
import MenuComponent, {MenuItem} from "./components/menu.js";
import FilterController from "./controllers/filter.js";
import {pointData, mainArticles} from "./mock/mock.js";
import TripController from "./controllers/trip.js";
import InfoController from "./controllers/info.js";
import {render, RenderPosition} from "./utils/render.js";
import PointsModel from "./models/points-model.js";
import StatsComponent from "./components/stats.js";
import API from "./api.js";

const AUTHORIZATION = `Basic hjksldfhjosijfeipo=`;
const END_POINT = `https://11.ecmascript.pages.academy/big-trip`;

const tripMainContainer = document.querySelector(`.trip-main`);
const tripControlsContainer = document.querySelector(`.trip-controls`);
const tripEventsContainer = document.querySelector(`.trip-events`);

const menuComponent = new MenuComponent(mainArticles);
render(tripControlsContainer, menuComponent, RenderPosition.BEFOREEND);

const api = new API(END_POINT, AUTHORIZATION);
const pointsModel = new PointsModel();
// pointsModel.setPoints(pointData);

const tripController = new TripController(tripEventsContainer, pointsModel, api);

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, () => {
  tripController.createPoint();
});

const filterController = new FilterController(tripControlsContainer, pointsModel);
filterController.render();

const infoController = new InfoController(tripMainContainer, pointsModel);
infoController.render();

// tripController.render(pointData);

const pageMain = document.querySelector(`.page-main .page-body__container`);

const statisticsComponent = new StatsComponent(pointsModel);
render(pageMain, statisticsComponent, RenderPosition.BEFOREEND);
statisticsComponent.hide();

menuComponent.setOnChange((item) => {
  switch (item) {
    case MenuItem.TABLE:
      menuComponent.setActiveItem(MenuItem.TABLE);
      tripController._sortComponent.show();
      tripController.show();
      statisticsComponent.hide();
      break;
    case MenuItem.STATS:
      menuComponent.setActiveItem(MenuItem.STATS);
      tripController._sortComponent.hide();
      tripController.hide();
      statisticsComponent.show();
      break;
  }
});

Promise.all([
  api.getPoints(),
  api.getDestinations(),
  api.getOffers()
]).then((res) => {
  pointsModel. setPoints(res[0]);
  tripController.render();
});
