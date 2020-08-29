import {COLORS} from '../const';
import {formatDate, isExpired, isRepeating} from '../utils/task';
import AbstractView from './abstract';

const BLANK_TASK = {
  description: ``,
  dueDate: null,
  repeatingDays: {
    mo: false,
    tu: false,
    we: false,
    th: false,
    fr: false,
    sa: false,
    su: false
  },
  color: COLORS[0]
};

const getTaskEditColorTemplate = (currentColor) =>
  `${COLORS.map((color) =>
    `<input type="radio" id="color-${color}-4" class="card__color-input card__color-input--${color} visually-hidden" name="color" value="${color}" ${color === currentColor ? `checked` : ``} />
    <label for="color-${color}-4" class="card__color card__color--${color}">${color}</label>`
  ).join(``)}`;

const getTaskEditDateTemplate = (dueDate) =>
  `<button class="card__date-deadline-toggle" type="button">
    date: 
    <span class="card__date-status">${dueDate !== null ? `yes` : `no`}</span>
  </button>
  ${dueDate !== null
    ? `<fieldset class="card__date-deadline">
      <label class="card__input-deadline-wrap">
        <input class="card__date" type="text" placeholder="" name="date" value="${formatDate(dueDate)}" />
      </label>
    </fieldset>`
    : ``}`;

const getTaskEditRepeatingTemplate = (repeatingDays) =>
  `<button class="card__repeat-toggle" type="button">
    repeat: 
    <span class="card__repeat-status">${isRepeating(repeatingDays) ? `yes` : `no`}</span>
  </button>
  ${isRepeating(repeatingDays)
    ? `<fieldset class="card__repeat-days">
      <div class="card__repeat-days-inner">
        ${Object.entries(repeatingDays).map(([day, repeat]) =>
    `<input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-${day}-4" name="repeat" value="${day}" ${repeat ? `checked` : ``} />
     <label class="card__repeat-day" for="repeat-${day}-4">${day}</label>`
  ).join(``)}
      </div>
    </fieldset>`
    : ``}`;

const getTaskEditTemplate = (task) => {
  const {description, dueDate, repeatingDays, color} = task;

  const classDeadline = isExpired(dueDate)
    ? `card--deadline`
    : ``;

  const classRepeat = isRepeating(repeatingDays)
    ? `card--repeat`
    : ``;

  const dateTemplate = getTaskEditDateTemplate(dueDate);
  const repeatingTemplate = getTaskEditRepeatingTemplate(repeatingDays);
  const colorTemplate = getTaskEditColorTemplate(color);

  return `<article class="card card--edit card--${color}  ${classDeadline}  ${classRepeat}">
    <form class="card__form" method="get">
      <div class="card__inner">
        <div class="card__color-bar">
          <svg class="card__color-bar-wave" width="100%" height="10">
            <use xlink:href="#wave"></use>
          </svg>
        </div>
        <div class="card__textarea-wrap">
          <label>
            <textarea class="card__text" placeholder="Start typing your text here..." name="text">${description}</textarea>
          </label>
        </div>
        <div class="card__settings">
          <div class="card__details">
            <div class="card__dates">
              ${dateTemplate}
              ${repeatingTemplate}
            </div>
          </div>
          <div class="card__colors-inner">
            <h3 class="card__colors-title">Color</h3>
            <div class="card__colors-wrap">
              ${colorTemplate}
            </div>
          </div>
        </div>
        <div class="card__status-btns">
          <button class="card__save" type="submit">save</button>
          <button class="card__delete" type="button">delete</button>
        </div>
      </div>
    </form>
  </article>`;
};

export default class TaskEditView extends AbstractView {
  constructor(task = BLANK_TASK) {
    super();
    this._task = task;
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit();
  }

  get template() {
    return getTaskEditTemplate(this._task);
  }

  set formSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.element.querySelector(`form`).addEventListener(`submit`, this._formSubmitHandler);
  }
}
