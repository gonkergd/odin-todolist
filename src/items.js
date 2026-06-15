class Type {
    getType() {
        return this.type;
    }
};

class BasicItem extends Type {
    constructor() {
        this.type = "basic";
    }
}

class ChecklistItem extends Type {
    constructor() {
        this.type = "checklist";
        this.checkList = [];
    }
    addCheckItem(item) {
        this.checkList(false, item);
    }
}

class ProgressItem extends Type {
    constructor(progressMax) {
        this.type = "progress";
        this.progressMax = progressMax;
        this.progress = 0;
    }
    setProgression(x) {
        this.progress = x;
    }
    addProgression(x) {
        this.progress = x;
    }
}


export class TodoItem extends Type {
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