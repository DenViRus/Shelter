export default class MainController {
  constructor(box, carousel, burger) {
    this.box = box;
    this.carousel = carousel;
    this.burger = burger;
  }


  mainControl() {
    this.carousel.mainCarouselControl();

    this.burger.burgerMenuControl();


  }
}
