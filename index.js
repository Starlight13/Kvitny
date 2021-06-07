
function Task(name) {
    this.name = name;
}


function ToDoListViewModel() {
    let self = this

    this.todos = ko.observableArray();
    this.dones = ko.observableArray();

    window.onload = () => {
        if (localStorage.getItem('todos')) {
            let tasks = JSON.parse(localStorage.getItem('todos'));
            for (let i = 0; i < tasks.length; i++) {
                this.todos.push(tasks[i]);
            }
        }

        if (localStorage.getItem('dones')) {
            let tasks = JSON.parse(localStorage.getItem('dones'));
            for (let i = 0; i < tasks.length; i++) {
                this.dones.push(tasks[i]);
            }
        }
    }

    window.onbeforeunload = () => {
        localStorage.clear();
        if (this.todos().length != 0) {
            localStorage.setItem('todos', ko.toJSON(this.todos()));
        }
        if (this.dones().length != 0) {
            localStorage.setItem('dones', ko.toJSON(this.dones()));
        }
    }

    this.addTodo = () => {
        this.todos.push(new Task(document.getElementById('task__input').value));
    }

    this.deleteTodo = (task) => {
        this.todos.remove(task);
    }

    this.deleteDone = (task) => {
        this.dones.remove(task);
    }

    this.doneTodo = (task) => {
        this.dones.push(task);
        this.todos.remove(task);
    }

}


ko.applyBindings(new ToDoListViewModel());