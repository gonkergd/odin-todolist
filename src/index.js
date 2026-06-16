import "./styles.css";
import { submitForm, addTodoItem } from "./longAssDOMManipulationFunctions.js";

export const newProject = document.querySelector("form");
export const projectList = document.querySelector(".projects");
export let projects = [];

newProject.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    submitForm(formData, true);
});


if (JSON.parse(localStorage.getItem("userData")) === null) {
    const basic = new FormData();
    basic.append("title", "Project");
    submitForm(basic, false);
}

export function getProjectObject() {
    return JSON.stringify(projects);
}

document.querySelector(".test").addEventListener("click", () => {
    console.log(getProjectObject());
    localStorage.setItem("userData", getProjectObject());
});

const inputter = document.querySelector("#title");
const json = JSON.parse(localStorage.getItem("userData"));
if (json != null) {
    json.forEach((n) => {
        if (n != null) {
            const formData = new FormData();
            formData.append('title', n.name);
            submitForm(formData);
            const p = n.todos;
            p.forEach((q) => {
                if (!q.destroyed) {
                    if (q.type === "checklist") {
                        let m = q.checklist;
                        addTodoItem(n.id, [q.title, q.description, q.dueDate, q.priority, q.color, q.type], q.done, m);
                    } else {
                        addTodoItem(n.id, [q.title, q.description, q.dueDate, q.priority, q.color, q.type], q.done);
                    }
                }
            });
        }
    })
}