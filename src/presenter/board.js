import {KeyCodes} from '../const';
import BoardView from '../view/board';
import TasksListView from '../view/tasks-list';
import LoadButtonView from '../view/load-button';
import {RenderPosition, remove, render, replace} from '../utils/render';
import SortingView from '../view/sorting';
import TaskEditView from '../view/task-edit';
import TaskView from '../view/task';
import NoTaskView from '../view/no-task';

const TASKS_COUNT_PER_STEP = 8;

export default class BoardPresenter {
  constructor(container) {
    this._container = container;
    this._board = new BoardView();
    this._tasksList = new TasksListView();
    this._loadButton = new LoadButtonView();
    this._renderedTasksCount = TASKS_COUNT_PER_STEP;
    this._renderMoreTasks = this._renderMoreTasks.bind(this);
  }

  _renderBoard() {
    render(this._container, this._board, RenderPosition.BEFOREEND);

    if (this._tasks.every((task) => task.isArchive)) {
      this._renderNoTasks();

      return;
    }

    this._renderSorting();
    this._renderTasksList();
  }

  _renderLoadButton() {
    render(this._board, this._loadButton, RenderPosition.BEFOREEND);
    this._loadButton.clickHandler = this._renderMoreTasks;
  }

  _renderMoreTasks() {
    this._renderTasks(this._renderedTasksCount, this._renderedTasksCount + TASKS_COUNT_PER_STEP);
    this._renderedTasksCount += TASKS_COUNT_PER_STEP;

    if (this._renderedTasksCount >= this._tasks.length) {
      remove(this._loadButton);
    }
  }

  _renderNoTasks() {
    render(this._board, new NoTaskView(), RenderPosition.BEFOREEND);
  }

  _renderSorting() {
    render(this._board, new SortingView(), RenderPosition.BEFOREEND);
  }

  _renderTask(task) {
    const taskCard = new TaskView(task);
    const taskEdit = new TaskEditView(task);

    const replaceCardToForm = () => {
      replace(taskEdit, taskCard);
    };

    const replaceFormToCard = () => {
      replace(taskCard, taskEdit);
    };

    const onEscKeyDown = (evt) => {
      if (evt.keyCode === KeyCodes.ESC) {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    taskCard.editClickHandler = () => {
      replaceCardToForm();
      document.addEventListener(`keydown`, onEscKeyDown);
    };

    taskEdit.formSubmitHandler = () => {
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    };

    render(this._tasksList, taskCard, RenderPosition.BEFOREEND);
  }

  _renderTasks(from, to) {
    this._tasks
      .slice(from, to)
      .forEach((task) => this._renderTask(task));
  }

  _renderTasksList() {
    render(this._board, this._tasksList, RenderPosition.BEFOREEND);
    this._renderTasks(0, Math.min(this._tasks.length, this._renderedTasksCount));

    if (this._tasks.length > this._renderedTasksCount) {
      this._renderLoadButton();
    }
  }

  init(tasks) {
    this._tasks = tasks.slice();
    this._renderBoard();
  }
}
