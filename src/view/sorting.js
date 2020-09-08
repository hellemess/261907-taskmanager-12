import AbstractView from './abstract';
import {SortTypes} from '../const';

export default class SortingView extends AbstractView {
  constructor() {
    super();
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName.toLowerCase() !== `a`) {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  get template() {
    return `<div class="board__filter-list">
        <a href="#" class="board__filter" data-sort-type="${SortTypes.DEFAULT}">SORT BY DEFAULT</a>
        <a href="#" class="board__filter" data-sort-type="${SortTypes.DATE_UP}">SORT BY DATE up</a>
        <a href="#" class="board__filter" data-sort-type="${SortTypes.DATE_DOWN}">SORT BY DATE down</a>
      </div>`;
  }

  set sortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener(`click`, this._sortTypeChangeHandler);
  }
}
