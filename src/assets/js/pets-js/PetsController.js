export default class PetsController {
  constructor(box, burger, data, actions) {
    this.box = box;
    this.burger = burger;

    this.data = data;
    this.actions = actions;
  }


  petsControl() {

    this.burger.burgerMenuControl();

    

  }
}