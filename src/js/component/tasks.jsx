import React, { useEffect, useState } from 'react';

export const TaskList = () => {
  const [task, setTask] = useState('');
  const [list, setList] = useState([]);

  const host = "https://playground.4geeks.com/todo/users/hermannjames";
  const addTaskUrl = "https://playground.4geeks.com/todo/todos/hermannjames"; // URL para añadir nuevas tareas
  const deleteHost = "https://playground.4geeks.com/todo/todos"; // URL base para eliminar tareas por ID

  // Cargar las tareas cuando el componente se monta
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(host);
        if (!response.ok) {
          console.error('Error fetching data: ', response.status, response.statusText);
          return;
        }

        const data = await response.json();
        setList(data.todos);
      } catch (error) {
        console.error('Fetch error: ', error);
      }
    };

    fetchData();
  }, []); // Se ejecuta solo una vez, al montar el componente

  const addTask = async (newTaskLabel) => {
    const dataToSend = {
      label: newTaskLabel,
      is_done: false
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend)
    };

    try {
      const response = await fetch(addTaskUrl, options);
      if (!response.ok) {
        console.error('Error: ', response.status, response.statusText);
        return { error: { status: response.status, statusText: response.statusText } };
      }

      const newTask = await response.json();
      return newTask;
    } catch (error) {
      console.error('Fetch error: ', error);
      return { error };
    }
  };

  const handleAddTask = async () => {
    if (task.trim() !== '') {
      const newTask = await addTask(task);
      if (newTask && !newTask.error) {
        setList([...list, newTask]);
        setTask('');
      }
    }
  };

  const deleteTask = async (id) => {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const response = await fetch(`${deleteHost}/${id}`, options);
      if (!response.ok) {
        console.error('Error: ', response.status, response.statusText);
        return { error: { status: response.status, statusText: response.statusText } };
      }
      return true;
    } catch (error) {
      console.error('Fetch error: ', error);
      return { error };
    }
  };

  const handleRemoveTask = async (index) => {
    const taskToRemove = list[index];
    const success = await deleteTask(taskToRemove.id);
    if (success) {
      const updatedList = list.filter((_, i) => i !== index);
      setList(updatedList);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
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
          <li key={item.id}>
            {item.label}
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
