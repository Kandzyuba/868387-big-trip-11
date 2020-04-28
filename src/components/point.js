export const createPointTemplate = (data) => {
  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${data.type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${data.type} to ${data.cities}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T10:30">${data.startPointDate}</time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-18T11:00">${data.endPointDate}</time>
          </p>
          <p class="event__duration">${data.timePosition}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${data.price}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">

        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};
