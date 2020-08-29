export const formatDate = (date) => date.toLocaleString(`en-US`, {day: `numeric`, month: `long`});

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
