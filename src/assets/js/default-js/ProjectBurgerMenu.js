export default class ProjectBurgerMenu {
  constructor(box) {
    this.box = box;
    this.boxHdr = this.box.querySelector(".header");
    this.hdrNavBox = this.boxHdr.querySelector(".header-nav-box");
    this.hdrNavBtn = this.boxHdr.querySelector(".header-nav-btn");
    this.hdrNavBtnItm = this.hdrNavBtn.querySelector(".header-nav-btn-item");
  }

  showMenu() {
    this.hdrNavBtnItm.classList.add("header-nav-btn-item-active");
    this.hdrNavBox.classList.add("header-nav-box-opened");
    this.box.closest("body").classList.add("nav-menu-open");
  }

  hideMenu() {
    this.hdrNavBtnItm.classList.remove("header-nav-btn-item-active");
    this.hdrNavBox.classList.remove("header-nav-box-opened");
    this.box.closest("body").removeAttribute("class");
  }

  burgerLstnr1 = (event) => {
    const target = event.target;

    if (target.closest(".header-nav-btn") && !target.closest(".nav-menu-open")) {
      event.preventDefault();
      this.showMenu();
    } else if (target.closest(".header-nav-btn") && target.closest(".nav-menu-open")) {
      event.preventDefault();
      this.hideMenu();
    }

    if (target.closest(".nav-menu-open") && !target.closest(".header-nav-box") && !target.closest(".header-nav-btn")) {
      event.preventDefault();
      this.hideMenu();
    }

    if (target.closest(".nav-menu-open") && target.closest(".header-nav-item")) {
      this.hideMenu();
    }
  };

  burgerMenuControl() {
    document.addEventListener("click", this.burgerLstnr1);
  }
}
