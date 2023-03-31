export default class MainCarousel {
  constructor(box, popup, data, actions) {
    this.box = box;
    this.popup = popup;
    this.data = data;
    this.actions = actions;

    this.crslSect = this.box.querySelector(".section-ourFriends");
    this.crslBox = this.crslSect.querySelector(".ourFriends-slider-box");
    this.crslSldr = this.crslBox.querySelector(".ourFriends-slider");
    this.crslSldrArr = [...this.crslSldr.querySelectorAll(".ourFriends-slider-card")];

    this.crslPrevBtn = this.crslBox.querySelector(".ourFriends-prev-button");
    this.crslNextBtn = this.crslBox.querySelector(".ourFriends-next-button");

    this.petsData = null;

    this.randNumbArr = null;
    this.sldrNumbArr = null;

    this.leftNumbArr = null;
    this.rightNumbArr = null;

    this.sldrDataArr = null;
  }

  async startCarousel() {
    await this.data.projectDataControl();
    this.petsData = this.data.petsData;
    this.randNumbArr = this.actions.getRandArr(1, this.petsData.length, this.sldrNumbArr);

    this.showSlider();
  }

  showSlider() {
    this.sldrDataArr = this.randNumbArr.map((item) => this.petsData.find((el) => el.ordNum === item));
    this.crslSldrArr.forEach((item, index) => {
      item.setAttribute("data-cardNum", `${this.sldrDataArr[index].ordNum}`);
      item.id = this.sldrDataArr[index].id;
      item.querySelector(".ourFriends-slider-card-img").src = this.sldrDataArr[index].img;
      item.querySelector(".ourFriends-slider-card-img").alt = `${this.sldrDataArr[index].type} ${this.sldrDataArr[index].name} image`;
      item.querySelector(".ourFriends-slider-card-heading").textContent = this.sldrDataArr[index].name;
    });
    this.sldrNumbArr = this.randNumbArr;
  }

  carouselLstnr1 = (event) => {
    const target = event.target;

    if (target.closest(".ourFriends-next-button")) {
      event.preventDefault();
      this.rightNumbArr ? (this.randNumbArr = this.rightNumbArr) : (this.randNumbArr = this.actions.getRandArr(1, this.petsData.length, this.sldrNumbArr));
      this.leftNumbArr = this.sldrNumbArr;
      this.rightNumbArr = null;
      this.crslSldrArr.forEach((item) => item.classList.add("slider-card-goLeft"));
      setTimeout(() => this.crslSldrArr.forEach((item) => item.classList.remove("slider-card-goLeft")), 300);
      setTimeout(() => this.showSlider(), 150);
    }

    if (target.closest(".ourFriends-prev-button")) {
      event.preventDefault();
      this.leftNumbArr ? (this.randNumbArr = this.leftNumbArr) : (this.randNumbArr = this.actions.getRandArr(1, this.petsData.length, this.sldrNumbArr));
      this.rightNumbArr = this.sldrNumbArr;
      this.leftNumbArr = null;
      this.crslSldrArr.forEach((item) => item.classList.add("slider-card-goRight"));
      setTimeout(() => this.crslSldrArr.forEach((item) => item.classList.remove("slider-card-goRight")), 300);
      setTimeout(() => this.showSlider(), 150);
    }

    if (target.closest(".ourFriends-slider-card")) {
      event.preventDefault();
      const petData = this.petsData.find((el) => el.id === target.closest(".ourFriends-slider-card").id);
      this.popup.showPopup(petData);
    }
  };

  async mainCarouselControl() {
    await this.startCarousel();

    this.popup.popupControl();

    document.addEventListener("click", this.carouselLstnr1);
  }
}
