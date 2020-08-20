import {KeyCodes} from './const';
import {generateTask} from './mock/task';
import {generateFilter} from './mock/filter';
import {RenderPosition, render} from './utils';
import MenuView from './view/menu';
import FilterView from './view/filter';
import BoardView from './view/board';
import TasksListView from './view/tasks-list';
import SortingView from './view/sorting';
import TaskEditView from './view/task-edit';
import TaskView from './view/task';
import LoadButtonView from './view/load-button';
import NoTaskView from './view/no-task';

const TASKS_COUNT = 23;
const TASKS_COUNT_PER_STEP = 8;

const tasks = new Array(TASKS_COUNT).fill().map(generateTask);
const filter = generateFilter(tasks);
const mainElement = document.querySelector(`.main`);
const controlsElement = mainElement.querySelector(`.main__control`);

const board = new BoardView();
const tasksList = new TasksListView();

let renderedTasksCount = TASKS_COUNT_PER_STEP;

const loadMore = (evt) => {
  evt.preventDefault();

  tasks
    .slice(renderedTasksCount, renderedTasksCount + TASKS_COUNT_PER_STEP)
    .forEach((task) => renderTask(tasksList.element, task));

  renderedTasksCount += TASKS_COUNT_PER_STEP;

  if (renderedTasksCount >= tasks.length) {
    evt.target.remove();
  }
};

const renderBoard = (container, boardTasks) => {
  render(container, RenderPosition.BEFOREEND, board.element);

  if (boardTasks.every((task) => task.isArchive)) {
    render(board.element, RenderPosition.BEFOREEND, new NoTaskView().element);

    return;
  }

  render(board.element, RenderPosition.BEFOREEND, new SortingView().element);
  render(board.element, RenderPosition.BEFOREEND, tasksList.element);

  for (let i = 0; i < Math.min(boardTasks.length, TASKS_COUNT_PER_STEP); i++) {
    renderTask(tasksList.element, boardTasks[i]);
  }

  if (renderedTasksCount < boardTasks.length) {
    const loadButton = new LoadButtonView();

    render(board.element, RenderPosition.BEFOREEND, loadButton.element);
    loadButton.element.addEventListener(`click`, loadMore);
  }
};

const renderTask = (container, task) => {
  const taskCard = new TaskView(task);
  const taskEdit = new TaskEditView(task);

  const replaceCardToForm = () => {
    container.replaceChild(taskEdit.element, taskCard.element);
  };

  const replaceFormToCard = () => {
    container.replaceChild(taskCard.element, taskEdit.element);
  };

  const onEscKeyDown = (evt) => {
    if (evt.keyCode === KeyCodes.ESC) {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  taskCard.element.querySelector(`.card__btn--edit`).addEventListener(`click`, (evt) => {
    evt.preventDefault();
    replaceCardToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  taskEdit.element.querySelector(`form`).addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToCard();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(container, RenderPosition.BEFOREEND, taskCard.element);
};

render(controlsElement, RenderPosition.BEFOREEND, new MenuView().element);
render(mainElement, RenderPosition.BEFOREEND, new FilterView(filter).element);
renderBoard(mainElement, tasks);
