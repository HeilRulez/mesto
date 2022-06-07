export default class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.append(element);
  }

  delItem(element) {
    this._container.querySelector(`#${element}`).remove();
  }

  renderAll(items) {
    items.forEach(item => this.addItem(this._renderer(item)));
  }
}
