console.log(window.innerWidth);

import MainController from "./MainController.js";
import MainCarousel from "./MainCarousel.js";

import ProjectBurgerMenu from "./../default-js/ProjectBurgerMenu.js";
import ProjectPopup from "./../default-js/ProjectPopup.js";

import ProjectActions from "./../default-js/ProjectActions.js";
import ProjectData from "./../default-js/ProjectData.js";

const mainBox = document.getElementById("mainBox");

const projectBurgerMenu = new ProjectBurgerMenu(mainBox);

const projectActions = new ProjectActions();
const projectPopup = new ProjectPopup(mainBox, projectActions);
const projectData = new ProjectData(projectActions);

const mainCarousel = new MainCarousel(mainBox, projectPopup, projectData, projectActions);

const mainController = new MainController(mainBox, mainCarousel, projectBurgerMenu);
mainController.mainControl();
