console.log(window.innerWidth);

import PetsController from "./PetsController.js";
import PetsPagination from "./PetsPagination.js";

import ProjectBurgerMenu from "./../default-js/ProjectBurgerMenu.js";
import ProjectPopup from "./../default-js/ProjectPopup.js";

import ProjectActions from "./../default-js/ProjectActions.js";
import ProjectData from "./../default-js/ProjectData.js";

const mainBox = document.getElementById("petsBox");

const projectBurgerMenu = new ProjectBurgerMenu(mainBox);

const projectActions = new ProjectActions();
const projectPopup = new ProjectPopup(mainBox, projectActions);
const projectData = new ProjectData(projectActions);

const petsPagination = new PetsPagination(mainBox, projectPopup, projectData, projectActions);

const petsController = new PetsController(mainBox, petsPagination, projectBurgerMenu);
petsController.petsControl();
