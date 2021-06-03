
let todos = [];
let dones = [];

window.onload = () => {
    if (localStorage.getItem('todos') != null){
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    if (localStorage.getItem("dones") != null){
        dones = JSON.parse(localStorage.getItem('dones'));
    }

    rebuildLists();
}

window.onbeforeunload = () => {
    localStorage.clear()

    if (todos.length != 0) {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    if (dones.length != 0) {
        localStorage.setItem('dones', JSON.stringify(dones));
    }
}

function rebuildLists() {
    for (let item in todos) {
        let newItemList = createLi(todos[item], "todo__element");
        let todoList = document.getElementById("todo__list");
        todoList.appendChild(newItemList);
    }

    for (let item in dones) {
        let newItemList = createLi(dones[item], "done__element");
        let doneList = document.getElementById("done__list");
        doneList.appendChild(newItemList);
    }
}

function removeFromArray(item, arr) {
    for (var i = 0; i < arr.length; i++) { 
        if (arr[i] == item) { 
            arr.splice(i, 1); 
            return;
        }
    }
}

function getTaskFromTextField() {
    return document.getElementById("task__input").value;
}

function createLi(task, className) {
    let taskText = document.createElement("span");
    taskText.innerHTML = task;

    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.addEventListener('click', deleteTask);

    let doneCheckbox = document.createElement('input');
    doneCheckbox.setAttribute("type", "checkbox");
    doneCheckbox.addEventListener('change', doneTodo);

    if (className == "done__element") {
        doneCheckbox.checked = true;
        doneCheckbox.disabled = true;
    }

    let liElement = document.createElement('li');
    liElement.setAttribute("class", className);
    liElement.appendChild(taskText);
    liElement.appendChild(deleteButton);
    liElement.appendChild(doneCheckbox);

    return liElement;
}

function addTodo(task) {
    todos.push(task);

    let newItemList = createLi(task, "todo__element");
    let todoList = document.getElementById("todo__list");
    todoList.appendChild(newItemList);
}

function addDone(task) {
    dones.push(task);

    let newItemList = createLi(task, "done__element");
    let doneList = document.getElementById("done__list");
    doneList.appendChild(newItemList);
}

function deleteTask(event) {

    let deleteButton = event.target;
    let listElement = deleteButton.parentNode;
    let taskName = listElement.querySelector("span").innerHTML;

    if (listElement.getAttribute("class") == "todo__element") {
        removeFromArray(taskName, todos);
    } else {
        removeFromArray(taskName, dones);
    }

    deleteButton.parentNode.remove();
}

function doneTodo(event) {

    let checkbox = event.target;
    checkbox.disabled = true;
    checkbox.style.backgroundColor = "green";

    let done = checkbox.parentNode;
    deleteTask(event);

    let taskName = done.querySelector("span").innerHTML;
    removeFromArray(taskName, todos);

    dones.push(taskName);

    done.setAttribute("class", "done__element");
    let doneList = document.getElementById("done__list");
    doneList.appendChild(done);
}