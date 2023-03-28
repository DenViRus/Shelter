console.log(window.innerWidth);

import PetsController from "./PetsController.js";
import ProjectBurgerMenu from "./../default-js/ProjectBurgerMenu.js";
import ProjectActions from "./../default-js/ProjectActions.js";
import ProjectData from "./../default-js/ProjectData.js";

const mainBox = document.getElementById("petsBox");

const projectBurgerMenu = new ProjectBurgerMenu(mainBox);
const projectActions = new ProjectActions();
const projectData = new ProjectData(projectActions);

const petsController = new PetsController(mainBox, projectBurgerMenu, projectData, projectActions);
petsController.petsControl();
