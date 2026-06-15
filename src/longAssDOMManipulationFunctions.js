export function todoItemCreator() {
    const makeTodoItem = document.createElement("form");
    const fieldset = document.createElement("fieldset");
    const legend = document.createElement("legend");
    makeTodoItem.appendChild(fieldset);
    fieldset.appendChild(legend);
    legend.textContent = "Create a Todo Item: ";
    formInput(fieldset, "Item name", "item-name", "text", "Item");
    formInput(fieldset, "Description", "description", "text", "Description", false);
    formInput(fieldset, "Due Date", "due-date", "date", "2020-12-12");
    formInput(fieldset, "Priority", "priority", "number", "1");
    formInput(fieldset, "Color", "color", "color", "#ffffff");
    formInputSelection(fieldset);
    const button = document.createElement("button");
    button.textContent = "Create Element!";
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
    const progress = document.createElement("option");
    progress.value = "progress";
    progress.textContent = "Progress";
    selectType.appendChild(basic);
    selectType.appendChild(checklist);
    selectType.appendChild(progress);
    fieldset.appendChild(label);
    fieldset.appendChild(selectType);
}