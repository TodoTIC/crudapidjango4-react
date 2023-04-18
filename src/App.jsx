import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')

  useEffect(() => {
    axios.get('http://localhost:8000/api/todos/')
      .then(({ data }) => {
        setTodos(_todos => {
          return data
        })
      })
  }, [])

  const handleChangeTodo = (event) => {
    setNewTodo(event.target.value)
  }

  const createTodo = (event) => {
    event.preventDefault()

    axios.post('http://localhost:8000/api/todos/', {
      title: newTodo
    })
      .then(({ data }) => {
        setTodos(_todos => {
          return [data, ..._todos]
        })
        setNewTodo('')
      })
  }

  const deleteTodo = (todo) => {
    axios.delete(`http://localhost:8000/api/todo/${todo.id}/`)
      .then(() => {
        setTodos(_todos => {
          return _todos.filter(t => t.id !== todo.id)
        })
      })
  }


  return (
    <div className="my-5 text-center">

      <div className="card mx-auto" style={{ maxWidth: '520px' }}>
        <div className="card-body">
          <div className="d-flex gap-3 justify-content-center">
            <a href="https://vitejs.dev" target="_blank">
              <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
            <a href="https://reactjs.org" target="_blank">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </div>

          <h1>TO DO List</h1>

          <div className="text-start">
            <form className="mt-5 mb-3" onSubmit={createTodo}>
              <div className="input-group">

                <input
                  type="text"
                  placeholder="Ingresa una nueva tarea"
                  className="form-control"
                  onChange={handleChangeTodo}
                  value={newTodo}
                />

                <button className="btn btn-primary">+</button>
              </div>
            </form>

            {
              todos.map(todo => (
                <div key={todo.id} className="d-flex gap-1 justify-content-between align-items-center">
                  <div>{todo.title}</div>
                  <a href="#" className="small" onClick={() => deleteTodo(todo)}>
                    Eliminar
                  </a>
                </div>
              ))
            }
          </div>

        </div>
      </div>

    </div>
  )
}

export default App
