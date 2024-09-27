import React, { useState, useEffect } from 'react';
import './App.css';

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [dueDateInput, setDueDateInput] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const addTask = () => {
    if (taskInput.trim() === '' || dueDateInput === '') return;

    const newTask = {
      text: taskInput,
      dueDate: new Date(dueDateInput),
      isDone: false,
    };

    setTasks([...tasks, newTask]);
    setTaskInput('');
    setDueDateInput('');

    const notificationTime = new Date(newTask.dueDate);
    notificationTime.setMinutes(notificationTime.getMinutes() - 30);

    setTimeout(() => {
      notify(newTask.text);
    }, notificationTime.getTime() - Date.now());
  };

  const toggleTaskStatus = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].isDone = !updatedTasks[index].isDone;
    setTasks(updatedTasks);
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleMode = () => {
    setDarkMode(!darkMode);
  };

  const notify = (taskText) => {
    if (Notification.permission === 'granted') {
      new Notification('Task Due Soon!', {
        body: `Task "${taskText}" is due soon!`,
        icon: 'https://example.com/icon.png',
      });
    } else {
      console.log('Notification permission denied');
    }
  };

  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  return (
    <div className={`container ${darkMode ? 'dark-mode' : ''}`}>
      <h2>To-Do List</h2>
      <button className="toggle-mode" onClick={toggleMode}>
        {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>
      <input
        type="text"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        placeholder="Add a new task..."
        style={{
          width: '90%',
          padding: '10px',
          margin: '10px 0',
          border: '1px solid #ddd',
          borderRadius: '5px',
          fontWeight: 'bolder',
        }}
      />
      <input
        type="datetime-local"
        value={dueDateInput}
        onChange={(e) => setDueDateInput(e.target.value)}
        style={{
          width: '90%',
          padding: '10px',
          margin: '10px 0',
          border: '1px solid #ddd',
          borderRadius: '5px',
          fontWeight: 'bolder',
        }}
      />
      <button onClick={addTask} style={{ padding: '10px', width: '100%', marginBottom: '10px', backgroundColor: '#28a745', color: '#fff', borderRadius: '5px', cursor: 'pointer' }}>
        Add Task
      </button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', marginBottom: '5px', background: '#f8f9fa', borderRadius: '5px' }}>
            <span className={`task-text ${task.isDone ? 'done' : ''}`}>{task.text}</span>
            <span className="mark-done" onClick={() => toggleTaskStatus(index)} style={{ cursor: 'pointer', marginLeft: '10px', color: '#007bff' }}>
              ✔
            </span>
            <span className="remove" onClick={() => removeTask(index)} style={{ cursor: 'pointer', marginLeft: '10px', color: '#dc3545' }}>
              ✖
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
