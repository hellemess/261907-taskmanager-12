import AbstractView from './abstract';

export default class TasksListView extends AbstractView {
  get template() {
    return `<div class="board__tasks"></div>`;
  }
}
