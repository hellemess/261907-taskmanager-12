import AbstractView from './abstract';

export default class BoardView extends AbstractView {
  get template() {
    return `<section class="board container"></section>`;
  }
}
