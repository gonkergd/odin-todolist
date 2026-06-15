import { TodoItem, TodoList } from './items.js';
import "./styles.css";

const newProject = document.querySelector("button");
const projectList = document.querySelector(".projects")
let projects = [];

newProject.addEventListener("click", () => {
    const projectDiv = document.createElement("div");
    projectDiv.style.backgroundColor = "rgba(" + Math.random() * 255 + ", " + Math.random() * 255 + ", " + Math.random() * 255 + ", 0.2)" 
    projectDiv.style.height = "20vh";
    projectDiv.style.width = "45vw";
    projectDiv.style.borderRadius = "10px";
    projectDiv.style.margin = "4px";
    projects.push(new TodoList(projectDiv));
    projectList.appendChild(projectDiv);
})