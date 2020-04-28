export const createCostTemplate = (data) => {
  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${data}</span>
    </p>`
  );
};
