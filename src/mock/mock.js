import {getRandomNumber, getRandomDate, getRandomItemArr, getRandomElements, getRandomPhoto, getEditPhotos, getPointTime, getCost} from "./../helpers/utils.js";

const offers = [{information: `Cap of Tea`, cost: 3}, {information: `lunch`, cost: 15}, {information: `Change musik`, cost: 5}, {information: `Switch to comfort`, cost: 80}];
const types = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`];
const cities = [`Berlin`, `Frankfurt`, `New York`, `Berkly`];
const destinations = [`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`, `Cras aliquet varius magna, non porta ligula feugiat eget.`, `Fusce tristique felis at fermentum pharetra.`, `Aliquam id orci ut lectus varius viverra.`, `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`, `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`, `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`, `Sed sed nisi sed augue convallis suscipit in sed felis.`, `Aliquam erat volutpat.`, `Nunc fermentum tortor ac porta dapibus.`, `In rutrum ac purus sit amet tempus`];
// let totalCost = 0;

const pointData = [];


const getpointData = () => {
  const startDate = getRandomDate();
  const endDate = getRandomDate();

  return {
    type: getRandomItemArr(types),
    city: getRandomItemArr(cities),
    price: getRandomNumber(20, 550),
    startDay: Math.min(startDate, endDate),
    endDay: Math.max(startDate, endDate),
    startPointDate: new Date(Math.min(startDate, endDate)),
    endPointDate: new Date(Math.max(startDate, endDate)),
    timePosition: getPointTime(new Date(endDate) - new Date(startDate)),
    offers: getRandomElements(offers),
    destination: getRandomItemArr(destinations),
    photos: getEditPhotos(getRandomPhoto())
  };
};

let POINTS_AMOUNT = 15;

for (let i = 0; i < POINTS_AMOUNT; i++) {
  pointData.push(getpointData());
}

const editData = getpointData();

let initialValue = 0;
let totalCost = pointData.reduce(getCost, initialValue);

pointData.sort((current, next) => current.startDay - next.startDay);

const travelDays = [...new Set(pointData.map((item) => new Date(item.startDay).toDateString()))];

export {pointData, editData, totalCost, travelDays};