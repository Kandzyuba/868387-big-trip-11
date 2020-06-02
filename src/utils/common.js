export const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const getRandomDate = () => {
  return Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * getRandomNumber(0, 60) * 60 * 1000;
};

export const getPointTime = (date) => {
  let delta = Math.floor(date) / 1000;
  const days = Math.floor(delta / 86400);
  delta -= days * 86400;
  const hours = Math.floor(delta / 3600) % 24;
  delta -= hours * 3600;
  const minutes = Math.floor(delta / 60) % 60;


  if (days >= 1) {
    return `${days}D ${hours}H ${minutes}M`;
  } else if (hours >= 1) {
    return `${hours}H ${minutes}M`;
  } else {
    return `${minutes}M`;
  }
};

export const getCost = (accumulator, currentValue) => {
  return accumulator + currentValue.price;
};

export const getTimeDuration = (timeInMs) => {
  const days = Math.floor(timeInMs / (1000 * 60 * 60 * 24)).toString().padStart(2, `0`);
  const hours = (Math.floor(timeInMs / (1000 * 60 * 60)) % 24).toString().padStart(2, `0`);
  const minutes = (Math.floor(timeInMs / (1000 * 60)) % 60).toString().padStart(2, `0`);
  const formattedDays = days > 0 ? `${days}D ` : ``;
  let formattedHours = `${hours}H `;

  if (days === 0) {
    formattedHours = hours > 0 ? `${hours}H ` : ``;
  }

  return `${formattedDays}${formattedHours}${minutes}M`;
};

export const FILTER_TYPES = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`
};

export const sortTypes = {
  EVENT: `event`,
  TIME: `time`,
  PRICE: `price`
};

export const TRANSPORT_TYPES = [
  `taxi`,
  `bus`,
  `train`,
  `ship`,
  `transport`,
  `drive`,
  `flight`
];

export const ACTIVITY_TYPES = [
  `check-in`,
  `sightseeing`,
  `restaurant`
];

export const FragmentType = {
  TRANSPORT: `to`,
  ACTIVITY: `in`
};

export const protectionPrices = (data) => {
  return data.replace(/[^+\d]/g, ``);
};

export const getFuturePoints = (points) => {
  return points.filter((point) => point.startPointDate > Date.now());
};

export const getPastPoints = (points) => {
  return points.filter((point) => point.endPointDate < Date.now());
};

export const getFilteredPoints = (points, filterType) => {
  switch (filterType) {
    case FILTER_TYPES.EVERYTHING:
      return points.sort((a, b) => a.startPointDate - b.startPointDate);
    case FILTER_TYPES.FUTURE:
      return getFuturePoints(points);
    case FILTER_TYPES.PAST:
      return getPastPoints(points);
  }

  return points;
};

export const getInitialLetter = (type) => {
  return (
    type[0].toUpperCase() + type.slice(1, type.length)
  );
};

