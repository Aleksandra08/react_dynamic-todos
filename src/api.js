export const getTodos = () => {
    return fetch('https://jsonplaceholder.typicode.com/todos')
        .then(res => res.json());
};

export const getUsers = () => {
    return fetch('https://jsonplaceholder.typicode.com/users')
        .then(res => res.json());
};