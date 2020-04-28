export const createDayTemplate = (date, datetime, dayNumber) => {
  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${dayNumber}</span>
        <time class="day__date" datetime="${datetime}">${date}</time>
      </div>

      <ul class="trip-events__list">

      </ul>
    </li>`
  );
};
