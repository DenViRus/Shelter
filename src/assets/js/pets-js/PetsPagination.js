export default class PetsPagination {
  constructor(box, popup, data, actions) {
    this.box = box;
    this.popup = popup;
    this.data = data;
    this.actions = actions;

    this.mnCont = this.box.querySelector(".main-content");

    this.mnCdBx = this.mnCont.querySelector(".main-card-box");
    this.mnCdArr = [...this.mnCdBx.querySelectorAll(".main-card")];

    this.mnPgnBx = this.mnCont.querySelector(".main-pagination-box");
    this.pgnDblPrevBtn = this.mnPgnBx.querySelector(".pagination-double-prev-button");
    this.pgnSnglPrevBtn = this.mnPgnBx.querySelector(".pagination-single-prev-button");
    this.mnPgnNumb = this.mnPgnBx.querySelector(".main-pagination-number");
    this.pgnSnglNextBtn = this.mnPgnBx.querySelector(".pagination-single-next-button");
    this.pgnDblNextBtn = this.mnPgnBx.querySelector(".pagination-double-next-button");

    this.prevBtnArr = [this.pgnDblPrevBtn, this.pgnSnglPrevBtn];
    this.nextBtnArr = [this.pgnDblNextBtn, this.pgnSnglNextBtn];
    this.pgnBtnArr = [this.pgnDblPrevBtn, this.pgnSnglPrevBtn, this.pgnDblNextBtn, this.pgnSnglNextBtn];

    this.pgnData = { allCards: 48, vsblCards: [8, 6, 3] };

    this.petsData = null;
    this.pgnNumbState = null;
    this.pgnDataState = null;

    this.pageState = null;
    this.pageStateVal = null;

    this.curPageNumb = null;
    this.curPageData = null;

    this.lastPageNumb = null;
    this.firstPageNumb = 1;
  }

  async startPagination() {
    await this.data.projectDataControl();
    this.petsData = this.data.petsData;

    this.pgnNumbState = this.actions.getPgnNumbState(this.mnCdArr.length, this.pgnData);
    this.pgnDataState = this.getPgnDataState(this.petsData, this.pgnNumbState);

    this.showPagination(this.firstPageNumb);
  }

  getPgnDataState(petsData, pgnNumbState) {
    const dataState = {};

    for (const state in pgnNumbState) {
      if (Object.hasOwnProperty.call(pgnNumbState, state)) {
        const statVal = pgnNumbState[state];
        dataState[state] = {};
        const dataStateVal = dataState[state];
        for (const page in statVal) {
          if (Object.hasOwnProperty.call(statVal, page)) {
            const pageArr = statVal[page];
            dataStateVal[page] = pageArr.map((item) => petsData.find((el) => el.ordNum === item));
          }
        }
      }
    }
    return dataState;
  }

  checkPage(page) {
    if (page > this.lastPageNumb) page = this.lastPageNumb;
    if (page === this.firstPageNumb) page = this.firstPageNumb;
    return page;
  }

  checkPaginationBox(numb) {
    this.pgnBtnArr.forEach((item) => (item.disabled = false));
    if (numb === this.lastPageNumb) {
      this.nextBtnArr.forEach((item) => (item.disabled = true));
    }
    if (numb === this.firstPageNumb) {
      this.prevBtnArr.forEach((item) => (item.disabled = true));
    }
  }

  showPagination(page = 1) {
    this.pageState = this.actions.getPageState(this.pgnData);
    this.pageStateVal = this.pgnDataState[this.pageState];
    this.lastPageNumb = Object.keys(this.pageStateVal).length;

    this.curPageNumb = this.checkPage(page);

    this.curPageData = this.pageStateVal[this.curPageNumb];
    this.mnCdArr.forEach((item, index) => {
      item.setAttribute("data-cardNum", `${this.curPageData[index].ordNum}`);
      item.id = this.curPageData[index].id;
      item.querySelector(".main-card-img").src = this.curPageData[index].img;
      item.querySelector(".main-card-img").alt = `${this.curPageData[index].type} ${this.curPageData[index].name} image`;
      item.querySelector(".main-card-heading").textContent = this.curPageData[index].name;
    });
    this.mnPgnNumb.textContent = this.curPageNumb;
    this.checkPaginationBox(this.curPageNumb);
  }

  paginationListener1 = (event) => {
    const target = event.target;

    if (target.closest(".pagination-double-prev-button")) {
      event.preventDefault();
      this.mnCdArr.forEach((item) => item.classList.add("pagin-card-goRight"));
      setTimeout(() => this.mnCdArr.forEach((item) => item.classList.remove("pagin-card-goRight")), 300);
      setTimeout(() => this.showPagination(this.firstPageNumb), 150);
    }

    if (target.closest(".pagination-single-prev-button")) {
      event.preventDefault();

      this.mnCdArr.forEach((item) => item.classList.add("pagin-card-goRight"));
      setTimeout(() => this.mnCdArr.forEach((item) => item.classList.remove("pagin-card-goRight")), 300);
      setTimeout(() => this.showPagination(this.curPageNumb - 1), 150);
    }

    if (target.closest(".pagination-single-next-button")) {
      event.preventDefault();
      this.mnCdArr.forEach((item) => item.classList.add("pagin-card-goLeft"));
      setTimeout(() => this.mnCdArr.forEach((item) => item.classList.remove("pagin-card-goLeft")), 300);
      setTimeout(() => this.showPagination(this.curPageNumb + 1), 150);
    }

    if (target.closest(".pagination-double-next-button")) {
      event.preventDefault();
      this.mnCdArr.forEach((item) => item.classList.add("pagin-card-goLeft"));
      setTimeout(() => this.mnCdArr.forEach((item) => item.classList.remove("pagin-card-goLeft")), 300);
      setTimeout(() => this.showPagination(this.lastPageNumb), 150);
    }

    if (target.closest(".main-card")) {
      event.preventDefault();
      const petData = this.petsData.find((el) => el.id === target.closest(".main-card").id);
      this.popup.showPopup(petData);
    }
  };

  async petsPaginationControl() {
    await this.startPagination();

    this.popup.popupControl();

    document.addEventListener("click", this.paginationListener1);
  }
}
