import React, {useEffect, useState} from 'react';

const Tasks = () => {
    const[task, setTask] = useState('');
    const[list,setList] = useState([]);

    const host = "https://playground.4geeks.com/todo";

    useEffect(() => {
        const fetchTasks = async () => {
            const response = await fetch(host);
            const data = await response.json();
            setList(data);
        };

        fetchTasks();
    }, []);

    const handleAddTask = () => {
        if(task.trim() !== ''){
            setList([...list, task]);
            setTask('');
        }
    }

    const handleRemoveTask = (index) => {
        const newList = [...list];
        newList.splice(index, 1);
        setList(newList);
    }

    const handleKeyPress = (e) => {
        if(e.key == 'Enter'){
            handleAddTask();
        }
    }

    return (
        <div className="container">
            <h1>todos</h1>
            <input value={task} onChange={(e) => setTask(e.target.value)} type="text" placeholder="What's need to be done?" onKeyDown={handleKeyPress}/>
            <ul>
                {list.map((item, index) => (
                    <li key={index}>
                        {item}
                        <button onClick={() => {handleRemoveTask(index)}}>X</button>
                    </li>
                ))}
            </ul>
        </div>
    );

}

export default Tasks;