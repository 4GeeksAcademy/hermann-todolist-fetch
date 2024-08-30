import React, { useState } from 'react';

export const TaskList = () => {
  const [task, setTask] = useState('');
  const [list, setList] = useState([]);

  const host = "https://playground.4geeks.com/todo/todos/hermannjames";

  const createData = async (taskToSend) => {
    const dataToSend = {
      "label": taskToSend,
      "is_done": false
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend)
    };

    try {
      const response = await fetch(host, options);
      if (!response.ok) {
        console.error('Error: ', response.status, response.statusText);
        return { error: { status: response.status, statusText: response.statusText } };
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetch error: ', error);
      return { error };
    }
  };

  const handleAddTask = async () => {
    if (task.trim() !== '') {
      const response = await createData(task);
      if (!response.error) {
        setList([...list, task]);
        setTask('');
      } else {
        console.error('Error adding task:', response.error);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  const handleRemoveTask = (index) => {
    const newList = [...list];
    newList.splice(index, 1);
    setList(newList);
    // Aquí podrías llamar a la API para eliminar la tarea si es necesario
  };

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
        {list.map((item, index) => (
          <li key={index}>
            {item}
            <button onClick={() => { handleRemoveTask(index) }}>X</button>
          </li>
        ))}
      </ul>
      <p className="taskCount">
        {list.length === 0 ? 'No hay tareas, Añadir tareas' : `${list.length} items left`}
      </p>
    </div>
  );
};
