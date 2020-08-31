import AbstractView from './abstract';

export default class NoTaskView extends AbstractView {
  get template() {
    return `<p class="board__no-tasks">Click «ADD NEW TASK» in menu to create your first task.</p>`;
  }
}
