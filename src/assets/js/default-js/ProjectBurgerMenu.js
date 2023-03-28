export default class ProjectBurgerMenu {
  constructor(box) {
    this.box = box;
    this.boxHdr = this.box.querySelector(".header");
    this.hdrNavBox = this.boxHdr.querySelector(".header-nav-box");
    this.hdrNavBtn = this.boxHdr.querySelector(".header-nav-btn");
    this.hdrNavBtnItm = this.hdrNavBtn.querySelector(".header-nav-btn-item");
  }

  toggleBurger() {
    this.hdrNavBtnItm.classList.toggle("header-nav-btn-item-active");
    this.hdrNavBox.classList.toggle("header-nav-box-opened");
    this.box.closest("body").classList.toggle("nav-menu-open");
  }

burgerLstnr1 = (event) => {
  const target = event.target;

  if (target.closest(".header-nav-btn")) {
    event.preventDefault();
    this.toggleBurger();
  }

  if (target.closest('.nav-menu-open') && target.closest('.header-nav-item')) {
    this.toggleBurger();
  }

  if (target.closest('.nav-menu-open') && !target.closest('.header-nav-box') && !target.closest('.header-nav-btn')) {
    event.preventDefault();
    this.toggleBurger();
  }

  if (target.closest('.nav-menu-open') && target.closest('.header-nav-box')) {
    event.preventDefault();
    return;
  }
};

  burgerMenuControl() {
    document.addEventListener("click", this.burgerLstnr1);

  }
}