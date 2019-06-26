import React from 'react';
import './App.css';
import TodoList from "./components/TodoList"


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            onLoadBtn: false,
            disable: false,
            allTodos: [],
            allUsers: []
        }
    }

    componentDidMount = async () => {
        const BASE_URL = 'https://jsonplaceholder.typicode.com';
        fetch(`${BASE_URL}/todos`)
            .then(response => response.json())
            .then(
                (result) => {
                    this.setState({
                        allTodos: result
                    });
                });


        fetch(`${BASE_URL}/users`)
            .then(response => response.json())
            .then(
                (result) => {
                    this.setState({
                        allUsers: result
                    });
                });
    };

    componentWillUnmount() {
        clearTimeout(this.timer)
    }

    pushBtn = () => {
        this.setState(prev => {
            return {
                disable: !prev.disable
            }
        });
        this.timer = setTimeout(() => {
            this.componentDidMount().then(this.setState({
                onLoadBtn: true
            }))
        }, 600)
    };

    sortTable = () => {
        this.setState({
            allTodos: this.state.allTodos.sort((a, b) => a.title.localeCompare(b.title))
        });
    };

    render() {
        return (
            <div>
                <h1 className="title"> TODOS </h1>
                {this.state.onLoadBtn
                    ?
                    <TodoList todos={this.state.allTodos} users={this.state.allUsers} sort={this.sortTable}/>
                    :
                    <button className='btn'
                            onClick={this.pushBtn}
                            disabled={this.state.disable}>
                        {this.state.disable ? 'Loading...' : 'Load'}
                    </button>
                }
            </div>
        );
    }
}

export default App;
