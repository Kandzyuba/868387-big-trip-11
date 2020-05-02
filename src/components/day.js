import {createElement} from "../helpers/utils.js";

const createDayTemplate = (date, dayNumber) => {
  const year = date.getFullYear();
  const month = (`0` + date.getMonth()).slice(-2);
  const day = (`0` + date.getDate()).slice(-2);
  const options = {month: `long`};

  const formattedDateDay = `${date.toLocaleString(`en-US`, options)} ${day}`;
  const datetime = `${year}-${month}-${day}`;

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${dayNumber}</span>
        <time class="day__date" datetime="${datetime}">${formattedDateDay}</time>
      </div>

      <ul class="trip-events__list">

      </ul>
    </li>`
  );
};

export default class Day {
  constructor(date, dateNumber) {
    this._date = date;
    this._dateNumber = dateNumber;
    this._element = null;
  }

  getTemplate() {
    return createDayTemplate(this._date, this._dateNumber);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
