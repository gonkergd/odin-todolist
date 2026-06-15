import { TodoItem, TodoList } from './items.js';
import "./styles.css";

const newProject = document.querySelector("form");
const projectList = document.querySelector(".projects")
let projects = [];

newProject.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const projectDiv = document.createElement("div");
    const projectTitle = document.createElement("div");
    projectTitle.textContent = formData.get("title");
    projectDiv.style.backgroundColor = "rgba(" + Math.random() * 255 + ", " + Math.random() * 255 + ", " + Math.random() * 255 + ", 0.2)" 
    projectDiv.style.height = "20vh";
    projectDiv.style.width = "45vw";
    projectDiv.style.borderRadius = "10px";
    projectDiv.style.margin = "4px";
    projects.push(new TodoList(projectDiv));
    projectList.appendChild(projectDiv);
})

// reference
// newBook.addEventListener("submit", (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     let bookDiv = document.createElement("div");
//     let bookObject = new Book(formData.get("title"),
//         formData.get("author"),
//         formData.get("pages"),
//         formData.get("read"));
//     bookDiv.textContent = bookObject.info();
//     bookDiv.style.backgroundColor = "rgb(" + Math.random() * 255 + ", " + Math.random() * 255 + ", " + Math.random() * 255 + ")";
//     bookDiv.style.minWidth = "50vw";
//     bookDiv.style.width = "max-content";
//     bookDiv.style.padding = "8px";
//     bookDiv.setAttribute("data-uuid", bookObject.id);
//     let destroyerButton = document.createElement("button");
//     destroyerButton.textContent = "Remove";
//     destroyerButton.style.marginLeft = "4px";
//     destroyerButton.addEventListener("click", (e) => {
//         destroyerButton.parentElement.remove();
//     });
//     if (!bookObject.read) {
//         let readButton = document.createElement("button");
//         readButton.textContent = "Mark as Read";
//         readButton.style.marginLeft = "4px";
//         readButton.addEventListener("click", (e) => {
//             bookObject.readTrigger();
//             bookDiv.textContent = bookObject.info();
//             bookDiv.appendChild(destroyerButton);
//         });
//         bookDiv.appendChild(readButton);
//         bookDiv.appendChild(destroyerButton);
//     } else {
//         bookDiv.appendChild(destroyerButton);
//     }

//     body.appendChild(bookDiv);
// });
