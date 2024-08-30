import React, { useEffect, useState } from 'react';

export const TaskList = () => {
  const [task, setTask] = useState('');
  const [list, setList] = useState([]);

  const host = "https://playground.4geeks.com/todo/users/hermannjames";
  const base_url = "https://playground.4geeks.com/todo";
  const addTaskUrl = "https://playground.4geeks.com/todo/todos/hermannjames";
  const deleteHost = "https://playground.4geeks.com/todo/todos";

  useEffect(() => {
    const getData = async () => {
      const uri = base_url + '/users/hermannjames';
      const response = await fetch(uri);
      if (!response.ok) {
        console.log('error: ', response.status, response.statusText);
        return {error: {status: response.status, statusText: response.statusText}};
      }
  
      const data = await response.json();
      setList(data.todos);
    }
  
    getData();
  }, []);

  const addTask = async (newTaskLabel) => {
    const uri = base_url + '/todos/hermannjames';
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
    }

    const response = await fetch(uri, options);
    if (!response.ok) {
      console.error('Error: ', response.status, response.statusText);
      return { error: { status: response.status, statusText: response.statusText } };
    }
    const newTask = await response.json();
    return newTask;

  }

  const handleAddTask = async () => {
    if (task.trim() !== '') {
      const newTask = await addTask(task);
      setList([...list, newTask]);
      setTask('');
    }
  };

  const deleteTask = async (id) =>{
    const uri = base_url + '/todos'
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const response = await fetch(`${uri}/${id}`, options);
    if (!response.ok) {
      console.error('Error: ', response.status, response.statusText);
      return { error: { status: response.status, statusText: response.statusText } };
    }
  }

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
