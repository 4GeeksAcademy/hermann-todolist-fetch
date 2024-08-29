import React, { useState, useEffect } from 'react';

const Tasks = () => {
    const [task, setTask] = useState('');
    const [list, setList] = useState([]);

    const host = "https://playground.4geeks.com/todo/users/hermannjames";

    // Función para cargar las tareas desde la API cuando la lista se carga por primera vez
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch(host);
                const data = await response.json();
                setList(data.todos || []); // Asumiendo que "todos" es el array que contiene las tareas
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();
    }, []);

    // Función para sincronizar la lista con el servidor
    const syncTasksWithServer = async (updatedList) => {
        try {
            await fetch(host, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ todos: updatedList }),
            });
            setList(updatedList);
        } catch (error) {
            console.error("Error syncing tasks with server:", error);
        }
    };

    // Función para agregar una nueva tarea
    const handleAddTask = () => {
        if (task.trim() !== '') {
            const updatedList = [...list, { label: task, is_done: false }];
            syncTasksWithServer(updatedList);
            setTask(''); // Limpia el input después de agregar la tarea
        }
    };

    // Función para marcar una tarea como completada o pendiente
    const toggleTaskCompletion = (index) => {
        const updatedList = list.map((item, i) => 
            i === index ? { ...item, is_done: !item.is_done } : item
        );
        syncTasksWithServer(updatedList);
    };

    // Función para eliminar una tarea
    const handleRemoveTask = (index) => {
        const newList = [...list];
        newList.splice(index, 1);
        syncTasksWithServer(newList);
    };

    // Función para eliminar todas las tareas
    const handleClearAllTasks = () => {
        syncTasksWithServer([]);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAddTask();
        }
    };

    return (
        <div className="container">
            <h1>todos</h1>
            <input
                value={task}
                onChange={(e) => setTask(e.target.value)}
                type="text"
                placeholder="What's need to be done?"
                onKeyDown={handleKeyPress}
            />
            <ul>
                {list.map((item, index) => (
                    <li key={index}>
                        <input
                            type="checkbox"
                            checked={item.is_done}
                            onChange={() => toggleTaskCompletion(index)}
                        />
                        {item.label}
                        <button onClick={() => handleRemoveTask(index)}>X</button>
                    </li>
                ))}
            </ul>
            <button onClick={handleClearAllTasks}>Clear All Tasks</button>
        </div>
    );
}

export default Tasks;
