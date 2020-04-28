const offers = [{information: `Cap of Tea`, cost: 3}, {information: `lunch`, cost: 15}, {information: `Change musik`, cost: 5}, {information: `Switch to comfort`, cost: 80}];
const types = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`];
const cities = [`Berlin`, `Frankfurt`, `New York`, `Berkly`];
const destinations = [`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`, `Cras aliquet varius magna, non porta ligula feugiat eget.`, `Fusce tristique felis at fermentum pharetra.`, `Aliquam id orci ut lectus varius viverra.`, `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`, `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`, `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`, `Sed sed nisi sed augue convallis suscipit in sed felis.`, `Aliquam erat volutpat.`, `Nunc fermentum tortor ac porta dapibus.`, `In rutrum ac purus sit amet tempus`];

// Mock utils
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const getRandomDate = () => {
  return Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * getRandomNumber(0, 60) * 60 * 1000;
};

const getRandomItemArr = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const getRandomElements = (data) => {
  const offersPoint = [];

  for (let i = 0; i < getRandomNumber(1, 4); i++) {
    offersPoint.push(data[i]);
  }
  return offersPoint;
};

const getRandomPhoto = () => {
  const photos = [];

  for (let i = 0; i < getRandomNumber(1, 5); i++) {
    photos.push(`http://picsum.photos/248/152?r=${Math.random()}`);
  }

  return photos;
};

const getEditPhotos = (photos) => {
  const photoTemplate = [];
  for (let i = 0; i < photos.length; i++) {
    photoTemplate.push(`<img class="event__photo" src="${photos[i]}" alt="Event photo">`);
  }

  return photoTemplate;
};

const getEditOffers = (data) => {
  const editOffers = [];
  const checkStatus = [true, false];
  let status = String;

  for (let i = 0; i < data.length; i++) {
    if (getRandomItemArr(checkStatus) === true) {
      status = `checked`;
    } else {
      status = ``;
    }

    editOffers.push(`<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${[i]}" type="checkbox" name="event-offer-${[i]}" ${status}>
    <label class="event__offer-label" for="event-offer-${[i]}">
      <span class="event__offer-title">${data[i].information}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${data[i].cost}</span>
    </label>
  </div>`);
  }
  return editOffers;
};

const getPointTime = (date) => {
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

const formatDate = (date, section) => {
  const year = date.getFullYear();
  const month = (`0` + date.getMonth()).slice(-2);
  const day = (`0` + date.getDate()).slice(-2);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const options = {month: `long`};

  switch (section) {
    case `edit`: return `${day}/${month}/${year.toString().slice(-2)} ${(`0` + hours).slice(-2)}:${(`0` + minutes).slice(-2)}`;
    case `point`: return `${(`0` + hours).slice(-2)}:${(`0` + minutes).slice(-2)}`;
    case `day`: return `${date.toLocaleString(`en-US`, options)} ${day}`;
    case `datetimeDay`: return `${year}-${month}-${day}`;
  }
};

let totalCost = 0;

const getCost = (data) => {
  let cost = 0;
  let offersCost = 0;

  for (const element of data) {
    cost += element.price;

    for (let i = 0; i < element.offersCounter; i++) {
      offersCost += element.offers[i].cost;
    }
  }

  totalCost = cost + offersCost;
  return totalCost;
};


// Формирование моков
const mockData = [];

const getMockData = () => {
  const startDate = getRandomDate();
  const endDate = getRandomDate();

  return {
    type: getRandomItemArr(types),
    cities: getRandomItemArr(cities),
    price: getRandomNumber(20, 550),
    startDay: Math.min(startDate, endDate),
    endDay: Math.max(startDate, endDate),
    startPointDate: formatDate(new Date(Math.min(startDate, endDate)), `point`),
    endPointDate: formatDate(new Date(Math.max(startDate, endDate)), `point`),
    timePosition: getPointTime(new Date(endDate) - new Date(startDate)),
    offers: getRandomElements(offers)
  };
};

let POINTS_AMOUNT = 15;

for (let i = 0; i < POINTS_AMOUNT; i++) {
  mockData.push(getMockData());
}


getCost(mockData);

mockData.sort((current, next) => current.startDay - next.startDay);

const getEditPointData = () => {
  const editStartDate = getRandomDate();
  const editFinishDate = getRandomDate();

  return {
    type: getRandomItemArr(types),
    city: getRandomItemArr(cities),
    editStartDate: formatDate(new Date(Math.min(editStartDate, editFinishDate)), `edit`),
    editFinishDate: formatDate(new Date(Math.max(editStartDate, editFinishDate)), `edit`),
    price: getRandomNumber(30, 250),
    destination: getRandomItemArr(destinations),
    photos: getEditPhotos(getRandomPhoto()),
    offers: getEditOffers(offers)
  };
};

const editPointData = getEditPointData();
const travelDays = [...new Set(mockData.map((item) => new Date(item.startDay).toDateString()))];

export {mockData, totalCost, editPointData, travelDays, formatDate};
