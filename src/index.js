import { TodoItem, TodoList } from './items.js';
import "./styles.css";
import { todoItemCreator } from './longAssDOMManipulationFunctions.js';
import { expand } from "./assets/expand.svg";
import { collapse } from "./assets/collapse.svg";

const newProject = document.querySelector("form");
const projectList = document.querySelector(".projects");
let projects = [];

newProject.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const projectDiv = document.createElement("div");
    const projectTitle = document.createElement("div");
    projectTitle.className = "title";
    projectTitle.textContent = formData.get("title");
    projectDiv.className = "project todo-list";
    projectDiv.style.backgroundColor = "rgba(" + Math.random() * 255 + ", " + Math.random() * 255 + ", " + Math.random() * 255 + ", 0.2)";
    let todoList = new TodoList(projectDiv);
    projects[todoList.id] = todoList;
    projectList.appendChild(projectDiv);
    projectDiv.appendChild(projectTitle);
    const itemCreationForm = todoItemCreator();
    projectDiv.appendChild(itemCreationForm);
    itemCreationForm.addEventListener("submit", (ev) => {
        ev.preventDefault();
        const newFormData = new FormData(ev.target);
        addTodoItem(todoList.id, newFormData);
    });
    const destructionButton = document.createElement("button");
    destructionButton.textContent = "Forget it!";
    destructionButton.style.order = Number.MAX_SAFE_INTEGER;
    destructionButton.addEventListener("click", (ev) => {
        destructionButton.parentElement.remove();
    });
    projectDiv.appendChild(destructionButton);
});

newProject.requestSubmit();

function addTodoItem(listID, properties) {
    let todoList = projects[listID];
    properties = (Array.from(properties)).map((n) => n[1]);
    /* 
    0: name
    1: description
    2: due date
    3: priority
    4: color (hex)
    5: type
    */
    const todoItemDiv = document.createElement("div");
    todoItemDiv.className = "todo-item";
    todoItemDiv.style.backgroundColor = properties[4];
    const todoItemTitle = document.createElement("div");
    todoItemTitle.className = "todo-item-title editable";
    todoItemTitle.textContent = properties[0];
    const todoItemDueDate = document.createElement("div");
    const todoItemDesc = document.createElement("div");
    todoItemDueDate.className = "description editable";
    todoItemDesc.className = "description editable";
    todoItemDesc.textContent = properties[1];
    todoItemDueDate.textContent = "Due: " + properties[2];
    todoItemDiv.style.order = properties[3];
    todoItemDiv.appendChild(todoItemTitle);
    todoItemDiv.appendChild(todoItemDueDate);
    todoItemDiv.appendChild(todoItemDesc);
    todoList.elementReference.appendChild(todoItemDiv);
}