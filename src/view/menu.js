import {createElement} from '../utils';

export default class MenuView {
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
    return `<section class="control__btn-wrap">
        <input type="radio" name="control" id="control__new-task" class="control__input visually-hidden" />
        <label for="control__new-task" class="control__label control__label--new-task">+ ADD NEW TASK</label>
        <input type="radio" name="control" id="control__task" class="control__input visually-hidden" checked />
        <label for="control__task" class="control__label">TASKS</label>
        <input type="radio" name="control" id="control__statistic" class="control__input visually-hidden" />
        <label for="control__statistic" class="control__label">STATISTICS</label>
      </section>`;
  }

  removeElement() {
    this._element = null;
  }
}
