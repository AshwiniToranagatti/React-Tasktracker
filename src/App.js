import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(data => setTasks(data.slice(0, 5))) // Limiting to 5 tasks for simplicity
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  const addTask = () => {
    if (newTask.trim() !== '') {
      const newTaskObject = {
        id: tasks.length + 1,
        title: newTask,
        completed: false
      };
      setTasks([...tasks, newTaskObject]);
      setNewTask('');
    }
  };

  const deleteTask = id => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = id => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="App">
      <h1>Task Tracker</h1>
      <div className="add-task">
        <input
          type="text"
          placeholder="Enter task..."
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul className="task-list">
        {tasks.map(task => (
          <li
            key={task.id}
            className={task.completed ? 'completed' : ''}
          >
            <span onClick={() => toggleComplete(task.id)}>
              {task.title}
            </span>
            <div>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
              <button onClick={() => toggleComplete(task.id)}>
                {task.completed ? 'Undo' : 'Mark as Completed'}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
