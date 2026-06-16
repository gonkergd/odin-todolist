import { TodoItem, TodoList } from './items.js';
import "./styles.css";
import { todoItemCreator } from './longAssDOMManipulationFunctions.js';
import expand from "./assets/expand.svg";
import collapse from "./assets/collapse.svg";

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
        projects[todoList.id] = null;
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
    todoItemDiv.style.display = "flex";
    todoItemDiv.style.flexDirection = "column";
    todoItemDiv.style.order = properties[3];

    const todoItemTitle = document.createElement("div");
    todoItemTitle.style.marginLeft = "8px";
    todoItemTitle.className = "todo-item-title editable";
    todoItemTitle.textContent = properties[0];

    const checkMark = document.createElement("div");
    checkMark.className = "todo-item-title";
    checkMark.textContent = "✓";
    checkMark.addEventListener("click", () => {
        if (todoItemTitle.style.textDecoration === "") {
            todoItemTitle.style.textDecoration = "line-through black solid 4px";
        } else {
            todoItemTitle.style.textDecoration = "";
        }
    });

    const checkMarkAndTitle = document.createElement("div");
    checkMarkAndTitle.style.display = "flex";
    checkMark.className = "todo-item-title";

    const todoItemDueDate = document.createElement("div");
    todoItemDueDate.className = "description editable";
    todoItemDueDate.textContent = "Due: " + properties[2];
    
    const todoItemDesc = document.createElement("div");
    todoItemDesc.style.marginTop = "4px";
    todoItemDesc.className = "description editable";
    todoItemDesc.textContent = properties[1];
    todoItemDesc.style.order = 1;

    const todoItemDescChecklist = document.createElement("div");
    if (properties[5].toLowerCase() === "checklist") {
        todoItemDesc.appendChild(todoItemDescChecklist);
        todoItemDescChecklist.style.order = 3;
    }

    const todoItemTitleBox = document.createElement("div");
    todoItemTitleBox.style.display = "flex";
    todoItemTitleBox.style.justifyContent = "space-between";

    const expandButton = document.createElement("img");
    expandButton.src = expand;
    expandButton.style.width = "1.25rem";

    const checkmarkItemCreator = document.createElement("button");
    checkmarkItemCreator.style.order = 2;
    checkmarkItemCreator.textContent = "Create checklist item...";
    checkmarkItemCreator.addEventListener("click", () => {
        const pulse = prompt("Create checklist item...");
        if (pulse != null) {
            createCheckmarkItem(todoItemDescChecklist, pulse);
        }
    });

    expandButton.addEventListener("click", () => {
        if (expandButton.src === expand) {
            expandButton.src = collapse;
            descriptionBox.appendChild(todoItemDesc);
            if (properties[5].toLowerCase() === "checklist") {
                descriptionBox.appendChild(todoItemDescChecklist);
                descriptionBox.appendChild(checkmarkItemCreator);
            }
        } else {
            expandButton.src = expand;
            descriptionBox.removeChild(todoItemDesc);
            if (properties[5].toLowerCase() === "checklist") {
                descriptionBox.removeChild(checkmarkItemCreator);
                descriptionBox.removeChild(todoItemDescChecklist);
            }
        }
    });

    const descriptionBox = document.createElement("div");
    descriptionBox.className = "description-box";

    const destroyThisItem = document.createElement("button");
    destroyThisItem.textContent = "Delete";
    destroyThisItem.style.marginTop = "4px";
    destroyThisItem.addEventListener("click", () => {
        todoItemDiv.remove();
    })

    todoItemTitle.addEventListener("click", (e) => {
        const x = prompt("Set todo item name: ", todoItemTitle.textContent);
        if (x != null) todoItemTitle.textContent = x;
    });
    todoItemDueDate.addEventListener("click", (e) => {
        const x = prompt("Set due date: ", todoItemDueDate.textContent.substring(5));
        if (x != null) todoItemDueDate.textContent = "Due: " + x;
    });
    todoItemDesc.addEventListener("click", (e) => {
        const x = prompt("Set description: ", todoItemDesc.textContent);
        if (x != null) todoItemDesc.textContent = x;
    });
    checkMarkAndTitle.appendChild(checkMark);
    checkMarkAndTitle.appendChild(todoItemTitle);
    todoItemTitleBox.appendChild(checkMarkAndTitle);
    todoItemTitleBox.appendChild(expandButton);
    todoItemDiv.appendChild(todoItemTitleBox);
    todoItemDiv.appendChild(todoItemDueDate);
    todoItemDiv.appendChild(descriptionBox);
    todoItemDiv.appendChild(destroyThisItem);
    todoList.elementReference.appendChild(todoItemDiv);
}

function createCheckmarkItem(todoItemDesc, desc) {
    const checkmark = document.createElement("div");
    checkmark.textContent = "✓";
    checkmark.className = "editable checkmark-centering";
    checkmark.addEventListener("click", () => {
        if (checkmarkDesc.style.textDecoration === "") {
            checkmarkDesc.style.textDecoration = "line-through black solid 4px";
        } else {
            checkmarkDesc.style.textDecoration = "";
        }
    });
    const checkmarkDesc = document.createElement("div");
    checkmarkDesc.textContent = desc;
    checkmarkDesc.className = "editable checkmark-centering";
    checkmarkDesc.addEventListener("click", () => {
        const newName = prompt("Give your checkmark item a new name...");
        if (newName != null) checkmarkDesc.textContent = newName;
    });
    const checkmarkButton = document.createElement("div");
    const destructionButton = document.createElement("button");
    destructionButton.textContent = "Remove";
    destructionButton.addEventListener("click", () => {
        checkmarkButton.remove();
    });
    destructionButton.style.marginLeft = "4px";
    checkmarkButton.style.display = "flex";
    checkmarkButton.style.order = 3;
    checkmarkButton.className = "checklist-item";
    checkmarkButton.appendChild(checkmark);
    checkmarkButton.appendChild(checkmarkDesc);
    checkmarkButton.appendChild(destructionButton);
    todoItemDesc.appendChild(checkmarkButton);
}