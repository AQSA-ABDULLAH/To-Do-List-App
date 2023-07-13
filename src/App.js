import './App.css';
import { FaCheck, FaTrash, FaPlusCircle } from "react-icons/fa"
import React, { useState, useEffect } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [Inprogress, setInprogress] = useState([]);
  const [Completed, setCompleted] = useState([]);
  const [input, setInput] = useState('');
  const addTodo = () => {
    const todo = {
      id: Math.floor(Math.random() * 1000),
      text: input
    }
    setTodos([todo, ...todos]);
  }

  const addToProgress = (id) => {
    const item = todos.find(x => x.id === id);
    setInprogress([item, ...Inprogress]);
    const filterarray = todos.filter(x => x.id !== id);
    setTodos([filterarray]);
  }

  const deleteTodo = (id) => {
    const filterarray = todos.filter(x => x.id !== id);
    setTodos([filterarray]);
  }

  const addToCompleted = (id) => {
    const item = Inprogress.find(x => x.id === id);
    setCompleted([item, ...Completed]);
    const filterarray = Inprogress.filter(x => x.id !== id);
    setTodos([filterarray]);
  }

  useEffect(() => {

  }, [todos, Inprogress, Completed])

  return (
    <div className="App">
      <div className='container'>
        <h3>TO-D0 List</h3>
        <form className='form_todo'>
          <input type="text" className='form-control' onChange={(e) => setInput(e.target.value)} name='text' />
          <button type="button" onClick={() => addTodo()} className='btn'><FaPlusCircle className='icon' /></button>
        </form>

        <div className='todos_wrapper'>
          <div className='todos_list'>
            <h3 className='todo_title'>Pending List</h3>
            {todos.map((item, index) =>
              <div className='todo_card' key={item.id}>
                <p className="card_text">{item.text}</p>
                <FaCheck className="icon-check-todo" onClick={() => addToProgress(item.id)} />
                <FaTrash className="icon-trash-todo" />
              </div>
            )}

          </div>
          <div className='todos_list'>
            <h3 className='todo_title'>Inprogress</h3>
            {Inprogress.map((item, index) =>
              <div className='Inprogress_card' key={item.key}>
                <p className="card_text">{item.text}</p>
                <FaCheck className="icon-check-todo" onClick={() => addToCompleted(item.id)} />
              </div>
            )}

          </div>
          <div className='todos_list'>
            <h3 className='todo_title'>Completed</h3>
            {Completed.map((item, index) =>
              <div className='Completed_card' key={item.key}>
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
