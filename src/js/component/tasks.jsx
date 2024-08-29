import React, {useEffect, useState} from 'react';

const Tasks = () => {
    const[task, setTask] = useState('');
    const[list,setList] = useState([]);

    const host = "https://playground.4geeks.com/todo/users/hermannjames";

    useEffect(() => {
        const fetchTasks = async () => {
            const response = await fetch(host);
            const data = await response.json();
            setList(data.todos || []);
        };

        fetchTasks();
    }, []);

    const syncWithServer = async (newList0) => {
        fetch(host, {
            method: "PUT",
            body: JSON.stringify({todos: newList0}),
            headers: {
              "Content-Type": "application/json"
            }
          })

          .then(resp => {
              console.log(resp.ok); // Será true si la respuesta es exitosa
              console.log(resp.status); // El código de estado 200, 300, 400, etc.
              console.log(resp.text()); // Intentará devolver el resultado exacto como string
              return resp.json(); // Intentará parsear el resultado a JSON y retornará una promesa donde puedes usar .then para seguir con la lógica
          })
          .then(data => {
              // Aquí es donde debe comenzar tu código después de que finalice la búsqueda
              console.log(data); // Esto imprimirá en la consola el objeto exacto recibido del servidor
          })
          .catch(error => {
              // Manejo de errores
              console.log(error);
          });
    }

    const handleAddTask = () => {
        if(task.trim() !== ''){
            const newTask = {label: task, is_done: false}
            const newList = [...list, {label: task, is_done: false}];
            setList(newList);
            syncWithServer(newList);
            setTask('');
        }
    }

    const handleRemoveTask = (index) => {
        const newList2 = [...list];
        newList2.splice(index, 1);
        setList(newList2);
        syncWithServer(newList2);
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
                        {item.label}
                        <button onClick={() => {handleRemoveTask(index)}}>X</button>
                    </li>
                ))}
            </ul>
        </div>
    );

}

export default Tasks;