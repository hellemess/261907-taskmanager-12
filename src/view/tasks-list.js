import {createElement} from '../utils';

export default class TasksListView {
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
    return `<div class="board__tasks"></div>`;
  }

  removeElement() {
    this._element = null;
  }
}
