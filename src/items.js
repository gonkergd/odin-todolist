export class TodoItem {
    static idSoFar = 1;
    constructor(title, description, dueDate, priority, color, checklist) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.color = color;
        this.checklist = checklist;
        this.id = idSoFar;
        this.done = false;
        idSoFar++;
    }
}

export class TodoList {
    constructor(element) {
        this.todos = [];
        this.elementReference = element;
    }

    add(todo) {
        this.todos.push(todo);
    }

    remove(id){
        this.todos = this.todos.filter(todo => todo.id !== id);
    }
}