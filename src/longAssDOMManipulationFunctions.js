import { ChecklistItem, TodoItem, TodoList, CheckItem } from "./items.js";
import {
  getProjectObject,
  newProject,
  projectList,
  projects,
} from "./index.js";
import "./styles.css";
import expand from "./assets/expand.svg";
import collapse from "./assets/collapse.svg";

export function todoItemCreator() {
  const makeTodoItem = document.createElement("form");
  const fieldset = document.createElement("fieldset");
  const legend = document.createElement("legend");
  makeTodoItem.appendChild(fieldset);
  fieldset.appendChild(legend);
  legend.textContent = "Create a Todo Item: ";
  formInput(fieldset, "Item name", "item-name", "text", "Item");
  formInput(
    fieldset,
    "Description",
    "description",
    "text",
    "Description",
    false,
  );
  formInput(fieldset, "Due Date", "due-date", "date", "2020-12-12");
  formInput(fieldset, "Priority", "priority", "number", "1");
  formInput(fieldset, "Color", "color", "color", "#ffffff");
  formInputSelection(fieldset);
  const button = document.createElement("button");
  button.textContent = "Create Todo!";
  button.style.marginLeft = "8px";
  button.style.marginTop = "8px";
  fieldset.appendChild(button);
  makeTodoItem.style.order = Number.MAX_SAFE_INTEGER - 1;
  return makeTodoItem;
}

function formInput(fieldset, name, htmlName, type, defaultValue, required) {
  const label = document.createElement("label");
  label.style.marginRight = "8px";
  label.style.marginLeft = "8px";
  label.style.marginTop = "8px";
  label.htmlFor = htmlName;
  const input = document.createElement("input");
  label.textContent = name;
  input.id = htmlName;
  input.type = type;
  input.defaultValue = defaultValue;
  input.name = htmlName;
  if (required === undefined) input.required = true;
  fieldset.appendChild(label);
  fieldset.appendChild(input);
}

function formInputSelection(fieldset) {
  const selectType = document.createElement("select");
  selectType.id = "item-select";
  selectType.name = "item-select";
  const basic = document.createElement("option");
  basic.value = "basic";
  basic.textContent = "Basic";
  const label = document.createElement("label");
  label.textContent = "Type";
  label.style.marginRight = "4px";
  label.style.marginLeft = "4px";
  label.htmlFor = "item-select";
  const checklist = document.createElement("option");
  checklist.value = "checklist";
  checklist.textContent = "Checklist";
  // const progress = document.createElement("option");
  // progress.value = "progress";
  // progress.textContent = "Progress";
  selectType.appendChild(basic);
  selectType.appendChild(checklist);
  // selectType.appendChild(progress);
  fieldset.appendChild(label);
  fieldset.appendChild(selectType);
}

// stolen from: MDN web docs
export function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === "QuotaExceededError" &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

export function submitForm(formData, reliable) {
  const projectDiv = document.createElement("div");
  const projectTitle = document.createElement("div");
  projectTitle.className = "title editable";
  projectTitle.textContent = formData.get("title");
  projectDiv.className = "project todo-list";
  projectDiv.style.backgroundColor =
    "rgba(" +
    Math.random() * 255 +
    ", " +
    Math.random() * 255 +
    ", " +
    Math.random() * 255 +
    ", 0.2)";
  let todoList = new TodoList(projectDiv, formData.get("title"));
  projects[todoList.id] = todoList;
  projectList.appendChild(projectDiv);
  projectDiv.appendChild(projectTitle);
  const itemCreationForm = todoItemCreator();
  projectDiv.appendChild(itemCreationForm);
  itemCreationForm.addEventListener("submit", (ev) => {
    ev.preventDefault();
    const newFormData = new FormData(ev.target);
    addTodoItem(
      todoList.id,
      Array.from(newFormData).map((n) => n[1]),
    );
    localStorage.setItem("userData", getProjectObject());
  });
  const destructionButton = document.createElement("button");
  destructionButton.textContent = "Forget it!";
  destructionButton.style.order = Number.MAX_SAFE_INTEGER;
  destructionButton.style.backgroundColor = "red";
  destructionButton.addEventListener("click", (ev) => {
    destructionButton.parentElement.remove();
    projects[todoList.id] = null;
    localStorage.setItem("userData", getProjectObject());
  });
  projectDiv.appendChild(destructionButton);
  if (reliable) {
    localStorage.setItem("userData", getProjectObject());
    console.log("Trusted!");
  }
  projectTitle.addEventListener("click", (e) => {
    const pulse = prompt("Rename project...");
    if (pulse != null) {
      projectTitle.textContent = pulse;
      projects[todoList.id].name = pulse;
      localStorage.setItem("userData", getProjectObject());
    }
  });
}

export function addTodoItem(
  listID,
  properties,
  isComplete,
  checklist = "banana",
) {
  let todoListItem = projects[listID];
  /* 
    properties documentation
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
  let thisItemObject =
    properties[5] === "basic"
      ? todoListItem.todos[
          todoListItem.add(
            new TodoItem(
              properties[0],
              properties[1],
              properties[2],
              properties[3],
              properties[4],
              properties[5],
              todoItemDiv,
            ),
          )
        ]
      : todoListItem.todos[
          todoListItem.add(
            new ChecklistItem(
              properties[0],
              properties[1],
              properties[2],
              properties[3],
              properties[4],
              properties[5],
              todoItemDiv,
            ),
          )
        ];

  const todoItemTitle = document.createElement("div");
  todoItemTitle.style.marginLeft = "8px";
  todoItemTitle.className = "todo-item-title editable";
  todoItemTitle.textContent = properties[0];

  const checkMark = document.createElement("div");
  checkMark.className = "todo-item-title";
  checkMark.textContent = "✓";
  checkMark.style.cursor = "pointer";
  checkMark.addEventListener("click", () => {
    thisItemObject.done = !thisItemObject.done;
    if (todoItemTitle.style.textDecoration === "") {
      todoItemTitle.style.textDecoration = "line-through black solid 4px";
    } else {
      todoItemTitle.style.textDecoration = "";
    }
    localStorage.setItem("userData", getProjectObject());
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
  expandButton.style.cursor = "pointer";

  const checkmarkItemCreator = document.createElement("button");
  checkmarkItemCreator.style.order = 2;
  checkmarkItemCreator.textContent = "Create checklist item...";
  checkmarkItemCreator.addEventListener("click", () => {
    const pulse = prompt("Create checklist item...");
    if (pulse != null) {
      createCheckmarkItem(todoItemDescChecklist, pulse, thisItemObject);
    }
    localStorage.setItem("userData", getProjectObject());
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
    localStorage.setItem("userData", getProjectObject());
  });

  const descriptionBox = document.createElement("div");
  descriptionBox.className = "description-box";

  const destroyThisItem = document.createElement("button");
  destroyThisItem.textContent = "Delete";
  destroyThisItem.style.marginTop = "4px";
  destroyThisItem.addEventListener("click", () => {
    thisItemObject.destroyed = true;
    todoItemDiv.remove();
    localStorage.setItem("userData", getProjectObject());
  });

  todoItemTitle.addEventListener("click", (e) => {
    const x = prompt("Set todo item name: ", todoItemTitle.textContent);
    if (x != null) {
      todoItemTitle.textContent = x;
      thisItemObject.title = x;
    }
    localStorage.setItem("userData", getProjectObject());
  });
  todoItemDueDate.addEventListener("click", (e) => {
    const x = prompt(
      "Set due date: ",
      todoItemDueDate.textContent.substring(5),
    );
    if (x != null) {
      todoItemDueDate.textContent = "Due: " + x;
      thisItemObject.dueDate = x;
    }
    localStorage.setItem("userData", getProjectObject());
  });
  todoItemDesc.addEventListener("click", (e) => {
    const x = prompt("Set description: ", todoItemDesc.textContent);
    if (x != null) {
      todoItemDesc.textContent = x;
      thisItemObject.description = x;
    }
    localStorage.setItem("userData", getProjectObject());
  });
  if (isComplete === true) {
    thisItemObject.done = !thisItemObject.done;
    todoItemTitle.style.textDecoration = "line-through black solid 4px";
  }
  if (checklist != "banana") {
    checklist.forEach((n) => {
      createCheckmarkItem(
        todoItemDescChecklist,
        n.name,
        thisItemObject,
        n.done,
      );
    });
  }
  checkMarkAndTitle.appendChild(checkMark);
  checkMarkAndTitle.appendChild(todoItemTitle);
  todoItemTitleBox.appendChild(checkMarkAndTitle);
  todoItemTitleBox.appendChild(expandButton);
  todoItemDiv.appendChild(todoItemTitleBox);
  todoItemDiv.appendChild(todoItemDueDate);
  todoItemDiv.appendChild(descriptionBox);
  todoItemDiv.appendChild(destroyThisItem);
  todoListItem.elementReference.appendChild(todoItemDiv);
}

function createCheckmarkItem(todoItemDesc, desc, object, done = false) {
  const checkmark = document.createElement("div");
  checkmark.textContent = "✓";
  checkmark.className = "editable checkmark-centering";
  checkmark.addEventListener("click", () => {
    if (checkmarkDesc.style.textDecoration === "") {
      checkmarkDesc.style.textDecoration = "line-through black solid 4px";
    } else {
      checkmarkDesc.style.textDecoration = "";
    }
    thisCheckItem.done = !thisCheckItem.done;
    localStorage.setItem("userData", getProjectObject());
  });
  const checkmarkDesc = document.createElement("div");
  checkmarkDesc.textContent = desc;
  checkmarkDesc.className = "editable checkmark-centering";
  checkmarkDesc.addEventListener("click", () => {
    const newName = prompt("Give your checkmark item a new name...");
    if (newName != null) {
      checkmarkDesc.textContent = newName;
      thisCheckItem.name = newName;
    }
    localStorage.setItem("userData", getProjectObject());
  });
  const checkmarkButton = document.createElement("div");
  const destructionButton = document.createElement("button");
  const thisCheckItem = new CheckItem(
    checkmarkDesc.textContent,
    checkmarkButton,
  );
  destructionButton.textContent = "Remove";
  destructionButton.addEventListener("click", () => {
    checkmarkButton.remove();
    object.checklist = object.checklist.filter((i) => i != thisCheckItem);
    localStorage.setItem("userData", getProjectObject());
  });
  object.addToChecklist(thisCheckItem);
  destructionButton.style.marginLeft = "4px";
  checkmarkButton.style.display = "flex";
  checkmarkButton.style.order = 3;
  checkmarkButton.className = "checklist-item";
  if (done) {
    checkmarkDesc.style.textDecoration = "line-through black solid 4px";
    thisCheckItem.done = !thisCheckItem.done;
  }
  checkmarkButton.appendChild(checkmark);
  checkmarkButton.appendChild(checkmarkDesc);
  checkmarkButton.appendChild(destructionButton);
  todoItemDesc.appendChild(checkmarkButton);
}
