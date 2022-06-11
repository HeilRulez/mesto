export default class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element, addCard = null) {
    if(addCard) {
      this._container.prepend(element)
    }else{
      this._container.append(element)
    }
  }

  renderAll(items) {
    items.forEach(item => this.addItem(this._renderer(item)));
  }
}
