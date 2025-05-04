import loadTodoItem from './TodoItem.js';
import './style.css';

// Todo state
let todos = [
    { 
      id: 1, 
      text: 'Learn JavaScript', 
      completed: false,
      dueDate: '2025-05-10' // Added date in YYYY-MM-DD format
    },
    { 
      id: 2, 
      text: 'Build a todo app', 
      completed: false,
      dueDate: '2025-05-15' // Added date in YYYY-MM-DD format
    }
  ];

function renderApp() {
    const appContainer = document.getElementById('content');
    appContainer.innerHTML = '';

    todos.forEach(todo => {
        const todoItem = loadTodoItem(todo);
        appContainer.appendChild(todoItem);
    });
}

console.log('Todo list app initialized');
document.addEventListener('DOMContentLoaded', renderApp);
