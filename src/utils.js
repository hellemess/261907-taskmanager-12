export const formatDate = (date) => date.toLocaleString(`en-US`, {day: `numeric`, month: `long`});

export const getRandomArrayValue = (array) => {
  const randomIndex = getRandomInteger(0, array.length - 1);

  return array[randomIndex];
};

export const getRandomInteger = (a = 0, b = 1) => {
  const min = Math.ceil(Math.min(a, b));
  const max = Math.floor(Math.max(a, b));

  return Math.floor(min + Math.random() * (max - min + 1));
};

export const isExpired = (dueDate) => {
  if (dueDate === null)
  {
    return false;
  }

  const currentDate = new Date();

  currentDate.setHours(23, 59, 59, 999);

  return currentDate.getTime() > dueDate.getTime();
};

export const isExpiringToday = (dueDate) => {
  if (dueDate === null)
  {
    return false;
  }

  const currentDate = new Date();

  currentDate.setHours(23, 59, 59, 999);

  return currentDate.getTime() === dueDate.getTime();
}

export const isRepeating = (repeatingDays) => Object.values(repeatingDays).some(Boolean);
