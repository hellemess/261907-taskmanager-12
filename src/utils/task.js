export const formatDate = (date) => date.toLocaleString(`en-US`, {day: `numeric`, month: `long`});

const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

export const isExpired = (dueDate) => {
  if (dueDate === null) {
    return false;
  }

  const currentDate = new Date();

  currentDate.setHours(23, 59, 59, 999);

  return currentDate.getTime() > dueDate.getTime();
};

export const isExpiringToday = (dueDate) => {
  if (dueDate === null) {
    return false;
  }

  const currentDate = new Date();

  currentDate.setHours(23, 59, 59, 999);

  return currentDate.getTime() === dueDate.getTime();
};

export const isRepeating = (repeatingDays) => Object.values(repeatingDays).some(Boolean);

export const sortTasksDateDown = (taskA, taskB) => {
  const weight = getWeightForNullDate(taskA.dueDate, taskB.dueDate);

  if (weight !== null) {
    return weight;
  }

  return taskB.dueDate.getTime() - taskA.dueDate.getTime();
};

export const sortTasksDateUp = (taskA, taskB) => {
  const weight = getWeightForNullDate(taskA.dueDate, taskB.dueDate);

  if (weight !== null) {
    return weight;
  }

  return taskA.dueDate.getTime() - taskB.dueDate.getTime();
};
