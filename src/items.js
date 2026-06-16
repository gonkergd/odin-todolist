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
    constructor(title, description, dueDate, priority, color, type, element) {
        this.destroyed = false;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.color = color;
        this.type = type;
        this.id = TodoItem.idSoFar;
        this.done = false;
        this.elementReference = element;
        TodoItem.idSoFar++;
    }
    markDone() {
        done = !this.done;
    }
    getId() {
        return this.id;
    }
}

export class ChecklistItem extends TodoItem {
    constructor(title, description, dueDate, priority, color, type, element) {
        super(title, description, dueDate, priority, color, type, element);
        this.checklist = [];
    }
    addToChecklist(item) {
        this.checklist.push(item);
        return item;
    }
}

export class CheckItem {
    constructor(name, element) {
        this.name = name;
        this.done = false;
        this.elementReference = element;
    }
}

// types: basic, checklist, progress (progress bar)

export class TodoList {
    static idSoFar = 0;
    constructor(element, name) {
        this.todos = [];
        this.name = name;
        this.elementReference = element;
        this.id = TodoList.idSoFar;
        TodoList.idSoFar++;
    }

    add(todoItem) {
        this.todos.push(todoItem);
        return this.todos.length - 1;
    }

    remove(id){
        this.todos = this.todos.filter(todo => todo.id !== id);
    }
}