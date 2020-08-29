import AbstractView from './abstract';

export default class LoadButtonView extends AbstractView {
  constructor() {
    super();
    this._clickHandler = this._clickHandler.bind(this);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  get template() {
    return `<button class="load-more" type="button">load more</button>`;
  }

  set clickHandler(callback) {
    this._callback.click = callback;
    this.element.addEventListener(`click`, this._clickHandler);
  }
}
