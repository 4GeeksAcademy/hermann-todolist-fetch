import React, {useState} from 'react';

const Tasks = () => {
    const[task, setTask] = useState('');
    const[list,setList] = useState([]);

    const host = "https://playground.4geeks.com/todo";

    const handleAddTask = () => {
        if(task.trim() !== ''){
            setList([...list, task]);
            setTask('');
        }
    }

    const handleRemoveTask = () => {
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
                    </li>
                ))}
            </ul>
        </div>
    );

}

export default Tasks;