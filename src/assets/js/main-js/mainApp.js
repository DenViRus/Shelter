console.log(window.innerWidth);

const mainBox = document.getElementById("mainBox");
const mainBoxHeader = mainBox.querySelector(".header");
const headerNavBox = mainBoxHeader.querySelector(".header-nav-box");
const headerNavBtn = mainBoxHeader.querySelector(".header-nav-btn");
const headerNavBtnItem = headerNavBtn.querySelector(".header-nav-btn-item");

const mainBoxHeaderListener1 = (event) => {
  const target = event.target;
  if (target.closest(".header-nav-btn")) {
    event.preventDefault();
    headerNavBtnItem.classList.toggle("header-nav-btn-item-active");
    headerNavBox.classList.toggle("header-nav-box-opened");
  }
};
mainBoxHeader.addEventListener("click", mainBoxHeaderListener1);
