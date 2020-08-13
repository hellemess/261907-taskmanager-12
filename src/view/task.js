import {createElement, formatDate, isExpired, isRepeating} from '../utils';

const getTaskTemplate = (task) => {
  const {description, dueDate, repeatingDays, color, isFavorite, isArchive} = task;

  const date = dueDate !== null
    ? formatDate(dueDate)
    : ``;

  const classDeadline = isExpired(dueDate)
    ? `card--deadline`
    : ``;

  const classRepeat = isRepeating(repeatingDays)
    ? `card--repeat`
    : ``;

  const classFavorite = isFavorite
    ? `card__btn--favorites card__btn--disabled`
    : `card__btn--favorites`;

  const classArchive = isArchive
    ? `card__btn--archive card__btn--disabled`
    : `card__btn--archive`;

  return `<article class="card card--${color}  ${classDeadline}  ${classRepeat}">
    <div class="card__form">
      <div class="card__inner">
        <div class="card__control">
          <button type="button" class="card__btn card__btn--edit">edit</button>
          <button type="button" class="card__btn  ${classArchive}">archive</button>
          <button type="button" class="card__btn  ${classFavorite}">favorites</button>
        </div>
        <div class="card__color-bar">
          <svg class="card__color-bar-wave" width="100%" height="10">
            <use xlink:href="#wave"></use>
          </svg>
        </div>
        <div class="card__textarea-wrap">
          <p class="card__text">${description}</p>
        </div>
        <div class="card__settings">
          <div class="card__details">
            <div class="card__dates">
              <div class="card__date-deadline">
                <p class="card__input-deadline-wrap">
                  <span class="card__date">${date}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>`;
};

export default class TaskView {
  constructor(task) {
    this._element = null;
    this._task = task;
  }

  get element() {
    if (!this._element) {
      this._element = createElement(this.template);
    }

    return this._element;
  }

  get template() {
    return getTaskTemplate(this._task);
  }

  removeElement() {
    this._element = null;
  }
}
