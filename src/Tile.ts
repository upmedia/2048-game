export default class Tile {
  #tileElement: HTMLElement;
  #x: number;
  #y: number;
  #value: number;

  constructor(tileContainer: HTMLElement, value: number = Math.random() < 0.5 ? 2 : 4) {
    this.#tileElement = document.createElement('div');
    this.#tileElement.classList.add('tile');
    tileContainer.append(this.#tileElement);
    this.value = value;
  }

  set value(value: number) {
    this.#value = value;
    this.#tileElement.textContent = `${value}`;

    const power = Math.log2(value);
    const backgroundLightness = 100 - (power * 9);
    this.#tileElement.style.setProperty('--background-lightness', `${backgroundLightness}%`);
    this.#tileElement.style.setProperty('--text-lightness', `${backgroundLightness <= 50 ? 90 : 10}%`);

  }

  set x(value: number) {
    this.#x = value;
    this.#tileElement.style.setProperty('--x', `${value}`);
  }

  set y (value: number) {
    this.#y = value;
    this.#tileElement.style.setProperty('--y', `${value}`);
  }
}
