const createPointOffers = (data) => {
  const {information, cost} = data;

  return (
    `<li class="event__offer">
      <span class="event__offer-title">${information}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${cost}</span>
    </li>`
  );
};

const createEditOffers = (data, index, status) => {
  const {information, cost} = data;

  return (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${index}" type="checkbox" name="event-offer-${index}" ${status}>
      <label class="event__offer-label" for="event-offer-${index}">
        <span class="event__offer-title">${information}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${cost}</span>
      </label>
    </div>`
  );
};

export {createPointOffers, createEditOffers};
