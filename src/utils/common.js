export const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const getRandomDate = () => {
  return Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * getRandomNumber(0, 60) * 60 * 1000;
};

export const getRandomItemArr = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export const getRandomElements = (data) => {
  const offersPoint = [];

  for (let i = 0; i < getRandomNumber(1, 4); i++) {
    offersPoint.push(data[i]);
  }
  return offersPoint;
};

export const getRandomPhoto = () => {
  const photos = [];

  for (let i = 0; i < getRandomNumber(1, 5); i++) {
    photos.push(`http://picsum.photos/248/152?r=${Math.random()}`);
  }

  return photos;
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

export const formatDate = (date, section) => {
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
