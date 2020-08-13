import {isExpired, isExpiringToday, isRepeating} from '../utils';

const taskToFilterMap = {
  all: (tasks) => tasks.filter((task) => !task.isArchive).length,
  overdue: (tasks) => tasks
    .filter((task) => !task.isArchive)
    .filter((task) => isExpired(task.dueDate)).length,
  today: (tasks) => tasks
    .filter((task) => !task.isArchive)
    .filter((task) => isExpiringToday(task.dueDate)).length,
  favorite: (tasks) => tasks
    .filter((task) => !task.isArchive)
    .filter((task) => task.isFavorite).length,
  repeating: (tasks) => tasks
    .filter((task) => !task.isArchive)
    .filter((task) => isRepeating(task.repeatingDays)).length,
  archive: (tasks) => tasks.filter((task) => task.isArchive).length
};

export const generateFilter = (tasks) =>
  Object.entries(taskToFilterMap).map(([filterTitle, countTasks]) => {
    return {
      title: filterTitle,
      count: countTasks(tasks)
    };
  });
