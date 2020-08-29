import AbstractView from './abstract';

const getFilterItemTemplate = (filterItem, isChecked) => {
  const {title, count} = filterItem;

  return `<input type="radio" id="filter__${title}" class="filter__input visually-hidden" name="filter" ${isChecked ? `checked` : ``} ${count === 0 ? `disabled` : ``} />
    <label for="filter__${title}" class="filter__label">
      ${title} 
      <span class="filter__${title}-count">${count}</span>
    </label>`;
};

export default class FilterView extends AbstractView {
  constructor(filter) {
    super();
    this._filter = filter;
  }

  get template() {
    return `<section class="main__filter filter container">
        ${this._filter.map((filterItem, i) => getFilterItemTemplate(filterItem, i === 0)).join(``)}
      </section>`;
  }
}
