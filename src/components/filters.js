import AbstractComponent from "./abstract-component.js";

const filterIdTemplate = `filter-`;

const getFilterName = (id) => {
  return id.substring(filterIdTemplate.length);
};

const getFilterLayout = (filter, isChecked) => {
  const {name} = filter;

  return (
    `<div class="trip-filters__filter">
      <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}" ${isChecked ? `checked` : ``}>
      <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
    </div>`
  );
};

const createFiltersTemplate = (filters) => {
  const filterLayout = filters.map((item) => getFilterLayout(item, item.checked)).join(`\n`);

  return (
    `<form class="trip-filters" action="#" method="get">
      ${filterLayout}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

export default class Filters extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createFiltersTemplate(this._filters);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`change`, (evt) => {
      const filterName = getFilterName(evt.target.id);
      handler(filterName);
    });
  }
}
