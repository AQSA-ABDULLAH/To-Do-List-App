import './App.css';
import { FaTrash } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import React, { useEffect, useState } from 'react';
import axios from 'axios';


import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {

  const [todos, setTodos] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [input, setInput] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    axios.get("http://localhost:3000/student")
      .then(response => {
        setTodos(response.data)
      })
      .catch(error => {
        console.log("error", error)
      })

    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
      setDarkMode(true);
    }
  }, [])

  // Function to toggle between dark and light modes
  const toggleDarkMode = () => {
    if (darkMode) {
      document.body.classList.remove('dark-mode');
      setDarkMode(false);
      localStorage.setItem('theme', 'light');
    } else {
      document.body.classList.add('dark-mode');
      setDarkMode(true);
      localStorage.setItem('theme', 'dark');
    }
  };


  const addTodo = (e) => {
    e.preventDefault(); // Prevent default form submission
    axios.post("http://localhost:3000/student", {
      name: input,
    })
      .then((response) => {
        setTodos([...todos, response.data]);
        setInput('');
        setShowForm(false);
        // localStorage.setItem("Task",input)
      })
      .catch((error) => {
        console.log("error", error);
      });
  }
  // localStorage.getItem('Task')
  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const addToProgress = (id) => {
    const item = todos.find((x) => x._id === id);
    setInProgress([item, ...inProgress]);
    const filteredTodos = todos.filter((x) => x._id !== id);
    setTodos(filteredTodos);
  };


  const deleteTodo = (id) => {
    console.log("i'm in delete button")
    axios.delete(`http://localhost:3000/student/${id}`, {
      name: input,
    })
      .then(() => {
        const updatedTodos = todos.filter((item) => item._id !== id);
        setTodos(updatedTodos);
      })
      .catch((error) => {
        console.log("Error deleting the task", error);

      });
  };;
  const addToCompleted = (id) => {
    const item = inProgress.find((x) => x._id === id);
    setCompleted([item, ...completed]);
    const filteredInProgress = inProgress.filter((x) => x._id !== id);
    setInProgress(filteredInProgress);
  };

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <div className='container'>
        <div className='NavBar'>
          <div className=''>
            <h3 className='title'>
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 48 48" fill="none">
                <path d="M17.8 18.1L10.4 25.4L6.2 21.3L4 23.5L10.4 29.9L20 20.3L17.8 18.1ZM17.8 5.10001L10.4 12.4L6.2 8.30001L4 10.5L10.4 16.9L20 7.30001L17.8 5.10001ZM17.8 31.1L10.4 38.4L6.2 34.3L4 36.5L10.4 42.9L20 33.3L17.8 31.1Z" fill="#3F51B5" />
                <path d="M24 22H44V26H24V22ZM24 9H44V13H24V9ZM24 35H44V39H24V35Z" fill="#90CAF9" />
              </svg>
              To Do App
            </h3>
          </div>
          <div>
            <button className={`btn ${darkMode ? 'btn-light' : 'btn-primary'} m-2`} onClick={toggleForm}>
              ADD NEW TASK
            </button>
            <button className={`btn ${darkMode ? 'btn-light' : 'btn-secondary'}`} onClick={toggleDarkMode}>
              {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            </button>
          </div>
        </div>

        {showForm && (
          <div className='form_wrapper'>
            <form className='form_todo' onSubmit={addTodo}>
              <input
                type="text"
                required
                className='form_control'
                onChange={(e) => { setInput(e.target.value) }}
                value={input}
                name='text'
                placeholder='Add New task'
              />
              <button type="submit" className='btn btn-primary'>Submit</button>
            </form>
          </div>
        )}
        <div className={`todos_wrapper ${darkMode ? 'dark-mode' : ''}`}>
          <div className='todos_list'>
            <h3 className='todo_title'>Pending List</h3>
            {todos.map((item) => (
              <div className='todo_card' key={item._id}>
                <p className="card_text">{item.name}</p>
                <FaCheck className="icon-check-todo" onClick={() => addToProgress(item._id)} />
                <FaTrash className="icon-trash-todo" onClick={() => deleteTodo(item._id)} />
              </div>
            ))}
          </div>

          <div className='todos_list'>
            <h3 className='todo_title'>In Progress</h3>
            {inProgress.map((item) => (
              <div className='inProgress_card' key={item._id}>
                <p className="card_text">{item.name}</p>
                <FaCheck className="icon-check-todo" onClick={() => addToCompleted(item._id)} />
              </div>
            ))}
          </div>

          <div className='todos_list'>
            <h3 className='todo_title'>Completed</h3>
            {completed.map((item, index) =>
              <div className='completed_card' key={item.id}>
                <p className="card_text">{item.name}</p>
                <FaCheck className="icon-check-todo" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
