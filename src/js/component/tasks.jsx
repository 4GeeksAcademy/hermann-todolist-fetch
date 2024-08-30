import React, {useState} from 'react';

export const TaskList = () => {
  const [task, setTask] = useState('');
  const [list, setList] = useState([]);

  const handleAddTask = () => {
    if(task.trim() !== ''){
      setList([...list, task]);
      setTask('');
    }
  }

  const handleKeyPress = (e) => {
    if(e.key === 'Enter'){
      handleAddTask();
    }
  }

  const handleRemoveTask = (index) => {
    const newList = [...list];
    newList.splice(index, 1);
    setList(newList);
  }

  return (
    <div className="container">
      <h1 className="title">todos</h1>
      <input type='text' placeholder="What's need to be done?" value={task} onChange={(e) => setTask(e.target.value)} onKeyDown={handleKeyPress} />
      <ul>
        {list.map((item, index) => (
          <li key={index}>
            {item}
            <button onClick={() => {handleRemoveTask(index)}}>X</button>
          </li>
        ))}
      </ul>
      <p className="taskCount">{list.length === 0 ? 'No hay tareas, Añadir tareas' : `${list.length} items left`}</p>
    </div>
  );
}