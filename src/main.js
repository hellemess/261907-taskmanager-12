import {generateTask} from './mock/task';
import {generateFilter} from './mock/filter';
import {getMenuTemplate} from './view/menu';
import {getFilterTemplate} from './view/filter';
import {getBoardTemplate} from './view/board';
import {getSortingTemplate} from './view/sorting';
import {getTaskEditTemplate} from './view/task-edit';
import {getTaskTemplate} from './view/task';
import {getLoadButtonTemplate} from './view/load-button';

const TASKS_COUNT = 23;
const TASKS_COUNT_PER_STEP = 8;

const tasks = new Array(TASKS_COUNT).fill().map(generateTask);
const filter = generateFilter(tasks);
const mainElement = document.querySelector(`.main`);
const controlsElement = mainElement.querySelector(`.main__control`);

const render = (container, position, template) => {
  container.insertAdjacentHTML(position, template);
};

render(controlsElement, `beforeend`, getMenuTemplate());
render(mainElement, `beforeend`, getFilterTemplate(filter));
render(mainElement, `beforeend`, getBoardTemplate());

const boardElement = mainElement.querySelector(`.board`);
const tasksListElement = boardElement.querySelector(`.board__tasks`);

render(boardElement, `afterbegin`, getSortingTemplate());
render(tasksListElement, `beforeend`, getTaskEditTemplate(tasks[0]));

for (let i = 1; i < Math.min(tasks.length, TASKS_COUNT_PER_STEP); i++) {
  render(tasksListElement, `beforeend`, getTaskTemplate(tasks[i]));
}

if (tasks.length > TASKS_COUNT_PER_STEP)
{
  let renderedTasksCount = TASKS_COUNT_PER_STEP;
  
  render(boardElement, `beforeend`, getLoadButtonTemplate());

  const loadButton = boardElement.querySelector(`.load-more`);

  loadButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();

    tasks
      .slice(renderedTasksCount, renderedTasksCount + TASKS_COUNT_PER_STEP)
      .forEach((task) => render(tasksListElement, `beforeend`, getTaskTemplate(task)));
    
    renderedTasksCount += TASKS_COUNT_PER_STEP;

    if (renderedTasksCount >= tasks.length)
    {
      loadButton.remove();
    }
  });
}
