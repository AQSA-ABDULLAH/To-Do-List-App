import './App.css';
import { FaCheck, FaTrash, FaPlusCircle } from "react-icons/fa"
import React, { useState, useEffect } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    const todo = {
      id: Math.floor(Math.random() * 1000),
      text: input
    }
    setTodos([todo, ...todos]);
    setInput('');
  }

  const addToProgress = (id) => {
    const item = todos.find(x => x.id === id);
    setInProgress([item, ...inProgress]);
    const filteredTodos = todos.filter(x => x.id !== id);
    setTodos(filteredTodos);
  }

  const deleteTodo = (id) => {
    const filteredTodos = todos.filter(x => x.id !== id);
    setTodos(filteredTodos);
  }

  const addToCompleted = (id) => {
    const item = inProgress.find(x => x.id === id);
    setCompleted([item, ...completed]);
    const filteredInProgress = inProgress.filter(x => x.id !== id);
    setInProgress(filteredInProgress);
  }

  useEffect(() => {

  }, [todos, inProgress, completed])

  return (
    <div className="App">
      <div className='container'>
        <h3>TO-DO List</h3>
        <form className='form_todo'>
          <input type="text" className='form-control' onChange={(e) => setInput(e.target.value)} value={input} name='text' />
          <button type="button" onClick={addTodo} className='btn'><FaPlusCircle className='icon' /></button>
        </form>

        <div className='todos_wrapper'>
          <div className='todos_list'>
            <h3 className='todo_title'>Pending List</h3>
            {todos.map((item, index) =>
              <div className='todo_card' key={item.id}>
                <p className="card_text">{item.text}</p>
                <FaCheck className="icon-check-todo" onClick={() => addToProgress(item.id)} />
                <FaTrash className="icon-trash-todo" onClick={() => deleteTodo(item.id)} />
              </div>
            )}
          </div>
          <div className='todos_list'>
            <h3 className='todo_title'>In Progress</h3>
            {inProgress.map((item, index) =>
              <div className='inProgress_card' key={item.id}>
                <p className="card_text">{item.text}</p>
                <FaCheck className="icon-check-todo" onClick={() => addToCompleted(item.id)} />
              </div>
            )}
          </div>
          <div className='todos_list'>
            <h3 className='todo_title'>Completed</h3>
            {completed.map((item, index) =>
              <div className='completed_card' key={item.id}>
                <p className="card_text">{item.text}</p>
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
