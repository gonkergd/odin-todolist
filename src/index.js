import { TodoItem, TodoList } from './items.js';
import "./styles.css";

const newProject = document.querySelector("form");
const projectList = document.querySelector(".projects");
let projects = [];

function todoItemCreator() {
    const makeTodoItem = document.createElement("form");
    const fieldset = document.createElement("fieldset");
    const legend = document.createElement("legend");
    makeTodoItem.appendChild(fieldset);
    fieldset.appendChild(legend);
    legend.textContent = "Create a Todo Item: ";
    formInput(fieldset, "Item name", "item-name", "text");
    return makeTodoItem;
}

function formInput(fieldset, name, htmlName, type) {
    const label = document.createElement("label");
    label.htmlFor = htmlName;
    const input = document.createElement("input");
    label.textContent = name;
    input.id = htmlName;
    input.type = type;
    input.name = htmlName;
    input.required = true;
    fieldset.appendChild(label);
    fieldset.appendChild(input);
}

newProject.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const projectDiv = document.createElement("div");
    const projectTitle = document.createElement("div");
    projectTitle.className = "title";
    projectTitle.textContent = formData.get("title");
    // const projectTitle2 = document.createElement("div");
    // projectTitle.className = "title";
    // projectTitle2.textContent = formData.get("title");
    projectDiv.style.backgroundColor = "rgba(" + Math.random() * 255 + ", " + Math.random() * 255 + ", " + Math.random() * 255 + ", 0.2)";
    let todoList = new TodoList(projectDiv);
    projectList.appendChild(projectDiv);
    projectDiv.appendChild(projectTitle);
    projectDiv.appendChild(todoItemCreator());
    // projectDiv.appendChild(projectTitle2);
})

