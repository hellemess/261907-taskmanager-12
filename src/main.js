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

const TASKS_COUNT = 23;
const TASKS_COUNT_PER_STEP = 8;

const tasks = new Array(TASKS_COUNT).fill().map(generateTask);
const filter = generateFilter(tasks);
const mainElement = document.querySelector(`.main`);
const controlsElement = mainElement.querySelector(`.main__control`);

const loadMore = (evt) => {
  evt.preventDefault();

  tasks
    .slice(renderedTasksCount, renderedTasksCount + TASKS_COUNT_PER_STEP)
    .forEach((task) => renderTask(tasksList.element, task));

  renderedTasksCount += TASKS_COUNT_PER_STEP;

  if (renderedTasksCount >= tasks.length)
  {
    evt.target.remove();
  }
};

const renderTask = (container, task) => {
  const taskCard = new TaskView(task);
  const taskEdit = new TaskEditView(task);

  const replaceCardToForm = () => {
    container.replaceChild(taskEdit.element, taskCard.element);
  }

  const replaceFormToCard = (evt) => {
    evt.preventDefault();
    container.replaceChild(taskCard.element, taskEdit.element);
  }

  taskCard.element.querySelector(`.card__btn--edit`).addEventListener('click', replaceCardToForm);
  taskEdit.element.querySelector(`form`).addEventListener(`submit`, replaceFormToCard);
  render(container, RenderPosition.BEFOREEND, taskCard.element);
}

render(controlsElement, RenderPosition.BEFOREEND, new MenuView().element);
render(mainElement, RenderPosition.BEFOREEND, new FilterView(filter).element);

const board = new BoardView();
const tasksList = new TasksListView();

render(mainElement, RenderPosition.BEFOREEND, board.element);
render(board.element, RenderPosition.BEFOREEND, new SortingView().element);
render(board.element, RenderPosition.BEFOREEND, tasksList.element);

for (let i = 0; i < Math.min(tasks.length, TASKS_COUNT_PER_STEP); i++) {
  renderTask(tasksList.element, tasks[i]);
}

let renderedTasksCount = TASKS_COUNT_PER_STEP;

if ( renderedTasksCount < tasks.length )
{
  const loadButton = new LoadButtonView();

  render(board.element, RenderPosition.BEFOREEND, loadButton.element);
  loadButton.element.addEventListener('click', loadMore);
}
