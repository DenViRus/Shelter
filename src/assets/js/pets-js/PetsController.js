export default class PetsController {
  constructor(box, pagination, burger) {
    this.box = box;
    this.pagination = pagination;
    this.burger = burger;
  }


  petsControl() {
    this.pagination.petsPaginationControl();

    this.burger.burgerMenuControl();



  }
}