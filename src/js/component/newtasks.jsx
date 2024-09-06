import React, { useState, useEffect } from 'react';

const TodoList = () => {
    const [task, setTask] = useState('');
    const [list, setList] = useState([]);
    const host = "https://playground.4geeks.com/todo";
    const user = "hermannjames"

    // Metodo 'GET'
    const getTasks = async () => {

        const uri = host + '/users/hermannjames';
        const options = {
            method: 'GET'
        }

        const response = await fetch(uri, options);
        if (!response.ok) {
            createUser()
            return;
        }
        const data = await response.json();
        setList(data.todos);
    }

    // Metodo 'POST'
    const addTask = async () => {
        const uri = host + '/todos/hermannjames';
        const dataToSend = {
            label: `${task}`,
            is_done: false
        }
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        }

        const response = await fetch(uri, options);
        if (!response.ok) {
            console.log(response.status);
            return;
        }
        const data = await response.json();

        getTasks()
        setTask('');
    }

    // Metodo 'DELETE'
    const removeTask = async (id) => {
        const uri = host + '/todos';
        const options = {
            method: 'DELETE'
        }

        const response = await fetch(`${uri}/${id}`, options);
        if (!response.ok) {
            console.log(response.status);
            return;
        }

        // const data = await response.json();

        setList(list.filter(item => item.id !== id));
        getTasks();

    }

    const createUser = async () => {
        const uri = `${host}/users/${user}`
        const options = {
            method: 'POST'
        }
        const response = await fetch(uri, options)

        if (!response.ok) return console.log(response.status)

        getTasks()
    }

    useEffect(() => {
        getTasks()
    }, []);

    const handleKeyPress = (e) => {
        if (e.key == 'Enter') {
            addTask();
        }
    }

    return (
        <div className="container">
            <h1 className="title">todos</h1>
            <input
                type='text'
                placeholder="What's need to be done?"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                onKeyDown={handleKeyPress}
            />
            <ul>
                {list.map((item) => (
                    <li key={item.id}>
                        {item.label}
                        <button onClick={() => { removeTask(item.id) }}>X</button>
                    </li>
                ))}
            </ul>
            <p className="taskCount">
                {list.length === 0 ? 'No hay tareas, Añadir tareas' : `${list.length} items left`}
            </p>
        </div>
    );
}

export default TodoList;