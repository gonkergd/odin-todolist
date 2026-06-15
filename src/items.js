export class TodoItem {
    static idSoFar = 1;
    constructor(title, description, dueDate, priority, color, type) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.color = color;
        this.type = type;
        this.id = idSoFar;
        this.done = false;
        idSoFar++;
    }
    getId() {
        return this.id;
    }
}

// types: basic, checklist, progress (progress bar)

export class TodoList {
    constructor(element) {
        this.todos = [];
        this.elementReference = element;
    }

    add(todoItem) {
        this.todos.push(todoItem);
    }

    remove(id){
        this.todos = this.todos.filter(todo => todo.id !== id);
    }
}