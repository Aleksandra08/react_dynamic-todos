import React from 'react';
import TodoItems from './TodoItems'

function TodoList(props) {
    let newList = props.todos.map(el => {
        let user = props.users.find(user => {
            return user.id === el.userId
        });
        return (
            <TodoItems key={el.id}
                       id={el.id}
                       name={user.name}
                       item={el.title}
                       complete={el.completed ? 'completed' : 'not completed'}
            />
        )
    });

    return (
        <table>
            <tbody>
            <tr className={'header'}>
                <td>Id</td>
                <td>Name</td>
                <td onClick={props.sort} className="sorting">Todos</td>
                <td>Completed</td>
            </tr>
            {newList}
            </tbody>
        </table>
    )
}

export default TodoList;
