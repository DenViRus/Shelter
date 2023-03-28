export default class ProjectPopup {
  constructor(box, actions) {
    this.box = box;
    this.actions = actions;


    this.pppBox = this.box.querySelector(".popup-box");
    this.pppCont = this.pppBox.querySelector(".popup-content");

    this.img = this.pppCont.querySelector(".popup-img");

    this.pppHead = this.pppCont.querySelector(".popup-heading");
    this.pppSubHead = this.pppCont.querySelector(".popup-sub-heading");
    this.pppDesc = this.pppCont.querySelector(".popup-description");
    this.pppItemAgeVal = this.pppCont.querySelector(".popup-item-age-val");
    this.pppItemInocVal = this.pppCont.querySelector(".popup-item-inoculations-val");
    this.pppItemDisVal = this.pppCont.querySelector(".popup-item-diseases-val");
    this.pppItemParVal = this.pppCont.querySelector(".popup-item-parasites-val");
  }

  showPopup(data) {
    this.img.src = this.actions.getCont(data.img);
    this.img.alt = `${this.actions.getCont(data.type).toLowerCase()} ${this.actions.getCont(data.name)} image`;
    this.pppHead.textContent = this.actions.getCont(data.name);
    this.pppSubHead.textContent = `${this.actions.getCont(data.breed)} - ${this.actions.getCont(data.type)}`;
    this.pppDesc.textContent = this.actions.getCont(data.description);
    this.pppItemAgeVal.textContent = this.actions.getCont(data.age);
    this.pppItemInocVal.textContent = this.actions.getCont(data.inoculations);
    this.pppItemDisVal.textContent = this.actions.getCont(data.diseases);
    this.pppItemParVal.textContent = this.actions.getCont(data.parasites);
    this.pppBox.classList.remove("hidden");
    this.box.closest("body").classList.add("popup-open");
  }

  hidePopup() {
    this.pppBox.classList.add("hidden");
    this.box.closest("body").classList.remove("popup-open");
    this.img.src = '';
    this.img.alt = '';
    this.pppHead.textContent = '';
    this.pppSubHead.textContent = '';
    this.pppDesc.textContent = '';
    this.pppItemAgeVal.textContent = '';
    this.pppItemInocVal.textContent = '';
    this.pppItemDisVal.textContent = '';
    this.pppItemParVal.textContent = '';
  }

  popupLstnr1 = (event) => {
    const target = event.target;

    if (target.closest(".popup-close-button")) {
      event.preventDefault();
      this.hidePopup();
    }


  }



  popupControl() {
    document.addEventListener("click", this.popupLstnr1);

  }


}