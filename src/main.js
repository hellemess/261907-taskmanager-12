import {getMenuTemplate} from './view/menu';
import {getFilterTemplate} from './view/filter';
import {getBoardTemplate} from './view/board';
import {getSortingTemplate} from './view/sorting';
import {getTaskEditTemplate} from './view/task-edit';
import {getTaskTemplate} from './view/task';
import {getLoadButtonTemplate} from './view/load-button';

const TASKS_COUNT = 3;

const mainElement = document.querySelector(`.main`);
const controlsElement = mainElement.querySelector(`.main__control`);

const render = (container, position, template) => {
  container.insertAdjacentHTML(position, template);
};

render(controlsElement, `beforeend`, getMenuTemplate());
render(mainElement, `beforeend`, getFilterTemplate());
render(mainElement, `beforeend`, getBoardTemplate());

const boardElement = mainElement.querySelector(`.board`);
const tasksListElement = boardElement.querySelector(`.board__tasks`);

render(boardElement, `afterbegin`, getSortingTemplate());
render(tasksListElement, `beforeend`, getTaskEditTemplate());

for (let i = 0; i < TASKS_COUNT; i++) {
  render(tasksListElement, `beforeend`, getTaskTemplate());
}

render(boardElement, `beforeend`, getLoadButtonTemplate());
