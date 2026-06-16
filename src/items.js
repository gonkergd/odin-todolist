class Type {
    getType() {
        return this.type;
    }
};

class Basic extends Type {
    constructor() {
        this.type = "basic";
    }
}

class Checklist extends Type {
    constructor() {
        this.type = "checklist";
        this.checkList = [];
    }
    addCheckItem(item) {
        this.checkList(false, item);
    }
}

// class Progress extends Type {
//     constructor(progressMax) {
//         this.type = "progress";
//         this.progressMax = progressMax;
//         this.progress = 0;
//     }
//     setProgression(x) {
//         this.progress = x;
//     }
//     addProgression(x) {
//         this.progress = x;
//     }
// }


export class TodoItem {
    static idSoFar = 0;
    constructor(title, description, dueDate, priority, color, type) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.color = color;
        this.type = type;
        this.id = TodoItem.idSoFar;
        this.done = false;
        TodoItem.idSoFar++;
    }
    markDone() {
        done = !this.done;
    }
    getId() {
        return this.id;
    }
}

// types: basic, checklist, progress (progress bar)

export class TodoList {
    static idSoFar = 0;
    constructor(element) {
        this.todos = [];
        this.elementReference = element;
        this.id = TodoList.idSoFar;
        TodoList.idSoFar++;
    }

    add(todoItem) {
        this.todos.push(todoItem);
    }

    remove(id){
        this.todos = this.todos.filter(todo => todo.id !== id);
    }
}