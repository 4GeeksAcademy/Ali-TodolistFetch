import React, { useEffect, useState } from "react";

export const TodoListFetch = () => {
    /*1- Se define la direccion del host */
    const host = 'https://playground.4geeks.com/todo'
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState('')
    const user = 'Ali'

    /*2- se define la funcion asyncrona para consumir la API */
    const getTodos = async () => {
        /* 3- Se define la uri del fetch() */
        const uri = `${host}/users/${user}`;
        /* 4- Se define la opcion del fetch() */
        const options = {
            method: 'GET'
        };

        /* 5- Se espera (await) recibir el objeto response que devuelve el fetch() */
        const response = await fetch(uri, options);
        /* 6- Se valida si el fetch arroja un error */
        if (!response.ok) {
            /* 7- Se trata y se genera una logica para el error */
            console.log('Error:', response.status, response.statusText);
            /* 9- Se termina con un return para evitar un error */
            return
        }
        /* 10- Se guarda en una variable los datos tipo json  */
        const data = await response.json()
        /* Se toman los datos que devuelve la API y se genera la logica */
        console.log(data)
        console.log(data.name);
        console.log(data.todos);
        setTodos(data.todos)
        return (data)
    }

    /* Funcion para crear usuario */
    const createUser = async (event) => {
        const dataToSend = {
            name: "Ali",
            id: 8
        }
        const uri = `${host}/users/${user}`
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        }
        const response = await fetch(uri, options)
        if (!response.ok) {
            console.log('Error', response.status, response.statusText);
            return
        }
        const data = await response.json()
        console.log(data);

        setTask(''); /* Deja el valor vacio al momento de enviar el dato */
        getTodos()  // Hacer regresa nuevamente los valores de (todos)

    }

    /* Funcion para enviar tarea */
    const handleSubmit = async (event) => {
        /* Para las funciones submit crear un evento prevent default para evitar que la pagina se recargue automaticamente  */
        event.preventDefault();
        if (task.trim() === '') return; /* Se evita registrar un dato vacio */

        const dataToSend = {
            label: task,
            is_done: false
        }
        const uri = `${host}/todos/${user}`
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        }
        const response = await fetch(uri, options)
        if (!response.ok) {
            console.log('Error', response.status, response.statusText);
            return
        }
        const data = await response.json()
        console.log(data);

        setTask(''); /* Deja el valor vacio al momento de enviar el dato */
        getTodos()  // Hacer regresa nuevamente los valores de (todos)

    }
    /* Funcion para modificar o actualizar tarea */
    const changeTaskStatus = async (item) => {
        const uri = `${host}/todos/${item.id}`
        /* Usamos el valor (data) para modificar el task, en este caso el data es (is_done), se alterna el valor buleano del repectivo item usando "!" */
        const taskStatus = { ...item, is_done: !item.is_done };
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskStatus)
        }
        const response = await fetch(uri, options)
        console.log(response);
        if (!response.ok) {
            console.log('Error: ', response.status, response.statusText);
            return
        }
        getTodos();
    }

    /* Funcion para borrar tarea */
    const deleteTask = async (item) => {
        const uri = `${host}/todos/${item.id}`
        const options = {
            method: 'DELETE'
        }
        const response = await fetch(uri, options)
        console.log(response);
        if (!response.ok) {

            console.log('Error: ', response.status, response.statusText);
            return
        }
        getTodos()
    }
    /* Funcion para reiniciar todo */
    const resetAll = async () => {
        const uri = `${host}/users/${user}`;
        const options = {
            method: 'DELETE'
        }
        const response = await fetch(uri, options)
        console.log(response);
        if (!response.ok) {

            console.log('Error: ', response.status, response.statusText);
            return
        }
        setTodos([]);
    }

    useEffect(() => {
        getTodos()
    }, [])

    return (
        <div className="container">
            <h1 className="text-success mt-3">To do list</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Add Task"
                    /* Se crea el event onChange para que funcione el submit */
                    value={task}
                    onChange={(event) => setTask(event.target.value)} />
            </form>
            {!todos ?
                <div class="spinner-border text-secondary mt-3" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
                :
                <ul className="list-group">
                    {todos.map((item) =>
                        <li key={item.id} className="list-group-item d-flex justify-content-between mt-2">
                            <div>
                                {item.label} {item.is_done ? <i className="fas fa-check text-success"></i> : ""}
                            </div>
                            <div>
                                <span onClick={() => changeTaskStatus(item)}>
                                    <i className="fas fa-edit btn btn-dark me-3 "></i>
                                </span>
                                <span onClick={() => deleteTask(item)}>
                                    <i className="fas fa-trash btn btn-danger"></i>
                                </span>
                            </div>
                        </li>)
                    }
                    <div className="mt-2 d-flex justify-content-center">
                        <button onClick={() => createUser(user)} type="button" className="btn btn-success">CREATE USER</button>
                        <button onClick={() => resetAll(user)} type="button" className="btn btn-danger mx-2">RESET ALL</button>
                    </div>
                </ul>
            }
        </div>
    )

}