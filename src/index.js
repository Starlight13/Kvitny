import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class InputField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ""
        }
    }

    handleChange = (event) => {
        this.setState({value: event.target.value});
    }    

    handleClick = () => {
        this.props.addTask(this.state.value)
        this.setState({value: ""})
    }

    render() {
        return (
            <div>
                <input id="input-field" type="text" placeholder="I need to..." value={this.state.value} onChange={this.handleChange}></input>
                <button onClick={this.handleClick}>Add</button>
            </div>
        )
    }
}

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            dones: []
        }
    }

    componentDidMount() {
        if (localStorage.getItem('todos')) {
            this.setState({
                todos: JSON.parse(localStorage.getItem('todos'))
            })
        }
        if (localStorage.getItem('dones')) {
            this.setState({
                dones: JSON.parse(localStorage.getItem('dones'))
            })
        }
        window.addEventListener("beforeunload", this.onUnload);
    }

    onUnload = () => {
        localStorage.clear();
        if (this.state.todos.length !== 0) {
            localStorage.setItem('todos', JSON.stringify(this.state.todos))
        }
        if (this.state.dones.length !== 0) {
            localStorage.setItem('dones', JSON.stringify(this.state.dones))
        }
    }

    handleAddition = (task)  => {
        const todos = this.state.todos.slice();
        todos.push(task)
        this.setState({ todos: todos });
    }

    doneTodo = (index) => {
        const dones = this.state.dones.slice();
        dones.push(this.state.todos[index])
        this.setState({ dones: dones });
        this.deleteTodo(index)
    }

    deleteTodo = (index) => {
        this.setState({
            todos: this.state.todos.filter((item, i) => i !== index)
        })
    }

    deleteDone = (index) => {
        this.setState({
            dones: this.state.dones.filter((item, i) => i !== index)
        })
    }



    render() {
        return (
            <div>
                <h1>Todo List</h1>
                <InputField addTask={this.handleAddition} />
                <h3>To do:</h3>
                {this.state.todos.map((value, i) => {
                    return <li key={i}>
                                {value}
                                <button onClick={ this.deleteTodo.bind(this, i) }>Delete</button>
                                <button onClick={ this.doneTodo.bind(this, i) }>Done</button>
                            </li>
                })}
                <h3>Done:</h3>
                {this.state.dones.map((value, i) => {
                    return <li key={i}>
                                {value}
                                <button onClick={ this.deleteDone.bind(this, i) }>Delete</button>
                            </li>
                })}
            </div>
        )
    }
}

ReactDOM.render(
    <TodoList />,
    document.getElementById('root')
);