import React from 'react';
import './App.css';
import TodoList,
{
    SORT_ORDER_COMPLETED,
    SORT_ORDER_TITLE,
    SORT_ORDER_USER,
} from "./components/TodoList"
import {getUsers, getTodos} from './api';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            onLoadBtn: false,
            disable: false,
            allTodos: [],
            allUsers: [],
            sortField: SORT_ORDER_TITLE,
            direction: {
                [SORT_ORDER_COMPLETED]: "asc",
                [SORT_ORDER_TITLE]: "asc",
                [SORT_ORDER_USER]: "asc",
            },
        };

        this.handleSort = (sortField) => {
            this.setState(prevState => {
                return {
                    sortField,
                    direction: Object.assign(prevState.direction, {
                        [sortField]: prevState.direction[sortField] === "asc" ? "desc" : "asc"
                    })
                };
            });
        };
    }

    async loadData() {
        const [todos, users] = await Promise.all([getTodos(), getUsers()]);
        const items = todos.map(todo => ({
            ...todo,
            user: users.find(user => user.id === todo.userId),
        }));
        const persons = users.map((user) => user);

        this.setState({
            allTodos: items,
            allUsers: persons
        });

    };


    pushBtn = () => {
        this.setState(prev => {
            return {
                disable: !prev.disable
            }
        });
        this.loadData().then(() => this.setState({
            onLoadBtn: true
        }))
    };

    sortTable = (todos, sortField) => {
        const callbackMap = {
            [SORT_ORDER_TITLE]: (a, b) => {
                return this.state.direction[sortField] === 'asc'
                    ? a.title.localeCompare(b.title)
                    : b.title.localeCompare(a.title)
            },
            [SORT_ORDER_COMPLETED]: (a, b) => {
                return this.state.direction[sortField] === "asc"
                    ? a.completed - b.completed
                    : b.completed - a.completed;
            },
            [SORT_ORDER_USER]: (a, b) => {
                return this.state.direction[sortField] === "asc"
                    ? a.user.name.localeCompare(b.user.name)
                    : b.user.name.localeCompare(a.user.name);
            },

        };

        return todos.sort(callbackMap[sortField]);
    };

    render() {
        const {allTodos, allUsers, sortField, disable, onLoadBtn} = this.state;
        const visibleTodos = this.sortTable(allTodos, sortField);

        return (
            <div>
                <h1 className="title"> TODOS </h1>
                {onLoadBtn
                    ? (
                        <TodoList todos={visibleTodos}
                                  users={allUsers}
                                  sort={this.handleSort}
                        />)
                    : (
                        <button className='btn'
                                onClick={this.pushBtn}
                                disabled={disable}>
                            {disable ? 'Loading...' : 'Load'}
                        </button>)
                }
            </div>
        );
    }
}

export default App;
