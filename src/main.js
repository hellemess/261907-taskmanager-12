import {generateTask} from './mock/task';
import {generateFilter} from './mock/filter';
import {RenderPosition, render} from './utils/render';
import MenuView from './view/menu';
import FilterView from './view/filter';
import BoardPresenter from './presenter/board';

const TASKS_COUNT = 23;

const tasks = new Array(TASKS_COUNT).fill().map(generateTask);
const filter = generateFilter(tasks);
const mainElement = document.querySelector(`.main`);
const controlsElement = mainElement.querySelector(`.main__control`);
const boardPresenter = new BoardPresenter(mainElement);

render(controlsElement, new MenuView(), RenderPosition.BEFOREEND);
render(mainElement, new FilterView(filter), RenderPosition.BEFOREEND);
boardPresenter.init(tasks);
