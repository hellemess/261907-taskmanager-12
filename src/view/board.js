import {createElement} from '../utils';

export default class BoardView {
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
    return `<section class="board container"></section>`;
  }

  removeElement() {
    this._element = null;
  }
}
