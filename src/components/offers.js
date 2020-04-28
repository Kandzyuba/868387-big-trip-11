export const createOffers = (data) => {
  return (
    `<li class="event__offer">
      <span class="event__offer-title">${data.information}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${data.cost}</span>
    </li>`
  );
};
