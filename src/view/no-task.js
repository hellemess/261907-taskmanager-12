import {createElement} from '../utils';

export default class NoTaskView {
  constructor() {
    this._element = null;
  }

  get element() {
    if (!this._element) {
      this._element = createElement(this.template);
    }

    return this._element;
  }

  get template() {
    return `<p class="board__no-tasks">Click «ADD NEW TASK» in menu to create your first task.</p>`;
  }

  removeElement() {
    this._element = null;
  }
}
