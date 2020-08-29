import {COLORS} from '../const';
import {getRandomArrayValue, getRandomInteger} from '../utils/common';

const descriptions = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`
];

const generateDueDate = () => {
  const isDate = Boolean(getRandomInteger(0, 1));

  if (!isDate) {
    return null;
  }

  const maxDaysGap = 7;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  const currentDate = new Date();

  currentDate.setHours(23, 59, 59, 999);
  currentDate.setDate(currentDate.getDate() + daysGap);

  return new Date(currentDate);
};

const generateRepeatingDays = () => {
  return {
    mo: Boolean(getRandomInteger(0, 1)),
    tu: false,
    we: false,
    th: Boolean(getRandomInteger(0, 1)),
    fr: false,
    sa: false,
    su: false
  };
};

export const generateTask = () => {
  const dueDate = generateDueDate();
  const repeatingDays = dueDate === null
    ? generateRepeatingDays()
    : {
      mo: false,
      tu: false,
      we: false,
      th: false,
      fr: false,
      sa: false,
      su: false
    };

  return {
    description: getRandomArrayValue(descriptions),
    dueDate,
    repeatingDays,
    color: getRandomArrayValue(COLORS),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    isArchive: Boolean(getRandomInteger(0, 1))
  };
};
