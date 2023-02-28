import React, {useState, useContext, useCallback, useEffect} from 'react';
import {Button, FormControl, Input, InputLabel} from "@mui/material";
import '../style/MainPage.scss'
import axios from "axios";
import {AuthContext} from "../context/auth.context";

const MainPage = () => {
    const [text, setText] = useState('')
    const [todos, setTodos] = useState([])
    const { userId } = useContext(AuthContext);

    const getTodos = useCallback(async () =>{
        try {
            await axios.get(`http://localhost:5000/api/todo/`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {userId}
            })
                .then( async (res) => {
                    await setTodos(res.data)
                })
        } catch (err) {
            console.error(err)
        }
    }, [userId])

    const removeTodo = useCallback(async (id, target) => {
        try {
            alert('Ви видалили завдання')
            await axios.delete(`http://localhost:5000/api/todo/delete/${id}`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {id}
            })
                .then(async () => {
                    console.log("TODOS")
                    console.log(todos);
                    target.blur();
                    await getTodos()
                    setTodos(todos.map(todo => todo.id === id ? {} : todo))
                    await getTodos()
                })

        } catch (err) {
            console.error(err)
        }
    }, [userId, getTodos])

    const editTodo = useCallback(async (target, id) => {
        const text = target.value
        if (!text) {
            await removeTodo(id, target)
                .then(() => {})
            return null
        }
        try {
            await axios.put(`http://localhost:5000/api/todo/edit/${id}`, {text, id}, {
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {id}
            })
                .then( async () => {
                    await getTodos()
                })
        } catch (err) {
            console.error(err)
        }
    }, [getTodos])

    const completeTodo = useCallback(async (id) => {
        try {
            await axios.put(`http://localhost:5000/api/todo/complete/${id}`,{
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {id}
            })
                .then(() => {
                    setTodos(todos.map(todo => todo.id === id ? {...todo, completed:  !todo.completed} : todo))
                    getTodos();
                })

        } catch (err) {
            console.error(err)
        }
    }, [userId, todos, getTodos, setTodos])

    const importantTodo = useCallback(async (id) => {
        try {
            await axios.put(`http://localhost:5000/api/todo/important/${id}`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {id}
            })
                .then(() => {
                    setTodos(todos.map(todo => todo.id === id ? {...todo, important:  !todo.important} : todo))
                    getTodos();
                })

        } catch (err) {
            console.error(err)
        }
    }, [userId, todos, getTodos, setTodos])

    const createTodo = useCallback(async () => {
        if (!text) return null;
        try {
            console.log(text);
            await axios.post('http://localhost:5000/api/todo/add', {text, userId},
                {headers: {
                        'Content-Type': 'application/json',
                    }})
                .then( async (response) => {
                    setTodos([...todos, response.data])
                    setText('')
                    await getTodos();
                })
        } catch (err) {
            console.error(err)
        }
    }, [text, userId, todos, getTodos]);

    useEffect(() => {
        const start = async  () =>  {
            await getTodos()
        }
        start().then(() => 0);
    },[getTodos])


    return (
        <div>
            <div className='main-page'>
                <div className="container">
                    <h1 className='main-text'>Додати завдання:</h1>
                    <form onKeyDown={async (e) => {
                        if(e.key === 'Enter') await createTodo();
                    }} className='add-noutin-form' onSubmit={event => event.preventDefault()}>
                        <FormControl className='new-todo'>
                            <InputLabel htmlFor="todo">Запис</InputLabel>
                            <Input
                                value={text}
                                onChange={e => setText(e.target.value)}
                                type='text' name='todo' id="todo" aria-describedby="my-helper-text" />
                        </FormControl>
                        <Button
                            onClick={createTodo}
                            variant="contained" className='add-todo-button'>Додати</Button>
                    </form>
                    <div className="active-tasks">
                        <h3>Активні завдання</h3>
                        {
                            todos.map((todo, i) => {

                                let container = ["todos-text-container"];
                                let text = ["todos-text"]

                                if (todo.completed) {
                                    container.push("complete")
                                }
                                if (todo.important) {
                                    text.push("important")
                                }

                                container = ((container).toString()).replace(',', ' ');
                                text = ((text).toString()).replace(',', ' ');



                                const inputElement =
                                    (<input
                                        onChange={e => editTodo(e.target, todo._id)}
                                        type="text" className={(text)} defaultValue={todo.text}
                                        onFocus={e => e.target.value = todo.text}>
                                    </input>)


                                return (
                                    <div className="todos" key={i}>
                                        <div className="todos-num">{++i}</div>
                                        <div className={(container)}>
                                            {inputElement}
                                        </div>
                                        <div className="todos-complete todo-function" onClick={async () => { await completeTodo(todo._id).then(r => r)}}>✔</div>
                                        <div className="todos-important todo-function" onClick={async () => { await importantTodo(todo._id).then(r => r)}}>⚠</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainPage;