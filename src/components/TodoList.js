import React from 'react';
import TodoItems from './TodoItems'

export const SORT_ORDER_COMPLETED = 'completed';
export const SORT_ORDER_TITLE = 'title';
export const SORT_ORDER_USER = 'user';


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
                <td onClick={() => props.sort(SORT_ORDER_USER)} className="sorting">Name</td>
                <td onClick={() => props.sort(SORT_ORDER_TITLE)} className="sorting">Todos</td>
                <td onClick={() => props.sort(SORT_ORDER_COMPLETED)} className="sorting">Completed</td>
            </tr>
            {newList}
            </tbody>
        </table>
    )
}

export default TodoList;
