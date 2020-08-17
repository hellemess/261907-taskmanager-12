import {createElement} from '../utils';

export default class LoadButtonView {
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
    return `<button class="load-more" type="button">load more</button>`;
  }

  removeElement() {
    this._element = null;
  }
}
