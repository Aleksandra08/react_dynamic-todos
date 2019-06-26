import React from 'react';
import User from './User'

function TodoItems(props) {
    return (
        <tr>
            <td>{props.id}</td>
            <td><User name={props.name}/></td>
            <td>{props.item}</td>
            <td>{props.complete} </td>
        </tr>
    );
}

export default TodoItems;