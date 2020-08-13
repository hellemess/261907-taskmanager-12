import {createElement} from '../utils';

const getFilterItemTemplate = (filterItem, isChecked) => {
  const {title, count} = filterItem;

  return `<input type="radio" id="filter__${title}" class="filter__input visually-hidden" name="filter" ${isChecked ? `checked` : ``} ${count === 0 ? `disabled` : ``} />
    <label for="filter__${title}" class="filter__label">
      ${title} 
      <span class="filter__${title}-count">${count}</span>
    </label>`;
};

export default class FilterView {
  constructor(filter) {
    this._element = null;
    this._filter = filter;
  }

  get element() {
    if (!this._element) {
      this._element = createElement(this.template);
    }

    return this._element;
  }

  get template() {
    return `<section class="main__filter filter container">
        ${this._filter.map((filterItem, i) => getFilterItemTemplate(filterItem, i === 0)).join(``)}
      </section>`;
  }

  removeElement() {
    this._element = null;
  }
}
