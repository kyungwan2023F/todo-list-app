import loadTodoItem from './TodoItem.js';
import './style.css';

// Todo state
let projects = [
  {
    id: 1,
    name: 'Learning Path',
    todos: [
      {
        id: 1,
        text: 'Learn JavaScript',
        completed: false,
        dueDate: '2025-05-10'
      },
      {
        id: 2,
        text: 'Study React',
        completed: false,
        dueDate: '2025-05-20'
      }
    ]
  },
  {
    id: 2,
    name: 'Personal Projects',
    todos: [
      {
        id: 3,
        text: 'Build a todo app',
        completed: false,
        dueDate: '2025-05-15'
      },
      {
        id: 4,
        text: 'Create portfolio website',
        completed: false,
        dueDate: '2025-06-01'
      }
    ]
  },
  {
    id: 3,
    name: 'Work Tasks',
    todos: [
      {
        id: 5,
        text: 'Code review PR #123',
        completed: true,
        dueDate: '2025-05-05'
      },
      {
        id: 6,
        text: 'Update documentation',
        completed: false,
        dueDate: '2025-05-12'
      }
    ]
  }
];

function renderApp() {
    const appContainer = document.getElementById('content');
    appContainer.innerHTML = '';

    const todoArea = document.createElement('div');
    todoArea.id = 'todoArea';

    appContainer.appendChild(todoArea);
    appContainer.appendChild(loadSideBar());
    todos.forEach(todo => {
        const todoItem = loadTodoItem(todo);
        appContainer.appendChild(todoItem);
    });
}

function loadSideBar() {
  const todoArea = document.getElementById('todoArea');
  const sideBar = document.createElement('div');
  sideBar.className = 'sideBar-container';

  const sideBarHeader = document.createElement('h2');
  sideBarHeader.textContent = 'My Projects';

  sideBar.appendChild(sideBarHeader);
  projects.forEach(project => {
    const projectItem = document.createElement('div');
    projectItem.className = 'projectContainer';
    projectItem.textContent = project.name;
    projectItem.addEventListener('click', () => displayToDos(project));
    sideBar.appendChild(projectItem);
  });
  return sideBar;
}

function displayToDos(project) {
  const todoArea = document.getElementById('todoArea');
  todoArea.innerHTML = '';
  const targetProject = projects.find(p => p.id === project.id);
  targetProject.todos.forEach(todo => {
    const todoItem = loadTodoItem(todo);
    todoArea.appendChild(todoItem);
  });
}

console.log('Todo list app initialized');
document.addEventListener('DOMContentLoaded', renderApp);
