
let todos = [];
let dones = [];

window.onload = () => {
    if (localStorage.getItem('todos') != null) {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    if (localStorage.getItem("dones") != null) {
        dones = JSON.parse(localStorage.getItem('dones'));
    }

    rebuildLists();
}

function rebuildLists() {
    for (let item in todos) {
        $('#todo__list').append(createLi(todos[item], "todo__element"))
    }

    for (let item in dones) {
        $('#done__list').append(createLi(dones[item], "done__element"))
    }
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

function getTaskFromTextField() {
    let input = $("#task__input").val()
    $("#task__input").val("")
    return input;
}


function addTodo(task) {
    todos.push(task)
    $('#todo__list').append(createLi(task, "todo__element"))
}

function createLi(task, className) {

    let li = $('<li/>')
        .addClass(className)

    $(li)
        .addClass(className)

    $('<span/>')
        .text(task)
        .appendTo(li);

    $('<button/>')
        .text("Delete")
        .attr("type", "button")
        .on('click', deleteTask)
        .appendTo(li);

    $('<input/>')
        .attr('type', 'checkbox')
        .on('change', doneTodo)
        .appendTo(li);

    if ($(li).hasClass("done__element")) {
        $(li).children('input')
            .attr({
                checked: true,
                disabled: true
            });
    }

    return li;
}

function deleteTask(event) {
    let deleteButton = event.target;

    let task = $(deleteButton).parent();
    let taskName = $(task).children('span').text();

    if ($(task).hasClass("todo__element")) {
        removeFromArray(taskName, todos);
    } else {
        removeFromArray(taskName, dones);
    }

    $(task).remove();
}

function doneTodo(event) {

    let doneCheckbox = event.target;
    $(doneCheckbox).attr('disabled', true);

    let doneTask = $(doneCheckbox).parent();
    $(doneCheckbox).parent().remove();

    let taskName = $(doneTask).children('span').text();
    removeFromArray(taskName, todos);
    dones.push(taskName);

    $(doneTask).removeClass('todo__element')
        .addClass('done__element');

    $(doneTask).children('button').on('click', deleteTask)

    $('#done__list').append(doneTask);
}

function removeFromArray(item, arr) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == item) {
            arr.splice(i, 1);
            return;
        }
    }
}