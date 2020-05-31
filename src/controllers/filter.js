import Filters from "../components/filters.js";
import {render, replace, RenderPosition} from "../utils/render.js";
import {FILTER_TYPES, getFilteredPoints} from "../utils/common.js";


export default class FilterController {
  constructor(container, pointsModel) {
    this._container = container;
    this._pointsModel = pointsModel;

    this._activeFilterType = FILTER_TYPES.EVERYTHING;
    this._tripFiltersComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._pointsModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const container = this._container;
    const allPoints = this._pointsModel.getPoints();

    const filters = Object.values(FILTER_TYPES).map((filterType) => {
      return {
        name: filterType,
        count: getFilteredPoints(allPoints, filterType).length,
        checked: filterType === this._activeFilterType,
      };
    });

    const oldComponent = this._tripFiltersComponent;

    this._tripFiltersComponent = new Filters(filters);
    this._tripFiltersComponent.setFilterChangeHandler(this._onFilterChange);

    if (oldComponent) {
      replace(this._tripFiltersComponent, oldComponent);
    } else {
      render(container, this._tripFiltersComponent, RenderPosition.AFTEREND);
    }
  }

  _onFilterChange(filterType) {
    this._pointsModel.setFilter(filterType);
    this._activeFilterType = filterType;
  }

  _onDataChange() {
    this.render();
  }
}
