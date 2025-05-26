import loadTodoItem from './TodoItem.js';
import './style.css';

// Selected Project Variable
let currentProjectId = null;

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
        id: 1,
        text: 'Build a todo app',
        completed: false,
        dueDate: '2025-05-15'
      },
      {
        id: 2,
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
        id: 1,
        text: 'Code review PR #123',
        completed: true,
        dueDate: '2025-05-05'
      },
      {
        id: 2,
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
    projectItem.addEventListener('click', () => {
      currentProjectId = project.id;
      displayToDos(project);
    });
    sideBar.appendChild(projectItem);
  });
  return sideBar;
}

function showAddTodo() {
  const todoArea = document.getElementById('todoArea');
  // Create the overlay (dim background)
  const overlay = document.createElement('div');
  overlay.style.position = 'absolute';
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.background = 'rgba(0, 0, 0, 0.3)';
  overlay.style.display = 'flex';
  overlay.style.justifyContent = 'center';
  overlay.style.alignItems = 'center';
  overlay.style.zIndex = 10;

  // Create the modal/dialog form
  const form = document.createElement('form');
  form.style.background = 'white';
  form.style.padding = '20px';
  form.style.borderRadius = '8px';
  form.style.boxShadow = '0 0 10px rgba(0,0,0,0.2)';
  form.style.width = '300px';
  form.style.maxWidth = '90%'; // Responsive fallback

  form.innerHTML = `
  <label>
    Task: <input type="text" id="todoText" required />
  </label><br/><br/>
  <label>
    Due Date: <input type="date" id="todoDueDate" required />
  </label><br/><br/>
  <button type="submit">Add</button>
  <button type="button" id="cancelBtn">Cancel</button>
`;

  overlay.appendChild(form);
  todoArea.appendChild(overlay);

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const text = form.querySelector('#todoText').value.trim();
    const dueDate = form.querySelector('#todoDueDate').value;

    if (text && dueDate) {
      addNewTodo(currentProjectId, text, dueDate);
      const currentProject = projects.find(p => p.id === currentProjectId);
      if (currentProject) {
        displayToDos(currentProject);
      }
    }
  })
}

function addNewTodo(projectID, text, dueDate) {
  const project = projects.find(p => p.id === projectID);

  const nextId = project.todos.length > 0
    ? Math.max(...project.todos.map(t => t.id)) + 1
    : 1;

  project.todos.push({
    id: nextId,
    text: text,
    completed: false,
    dueDate: dueDate
  });
}


function displayToDos(project) {
  const todoArea = document.getElementById('todoArea');
  todoArea.innerHTML = '';
  const targetProject = projects.find(p => p.id === project.id);
  targetProject.todos.forEach(todo => {
    const todoItem = loadTodoItem(todo);
    todoArea.appendChild(todoItem);
  });
  const addToDoButton = document.createElement('button');
  addToDoButton.className = 'add-Button';
  addToDoButton.textContent = 'Add ToDo';

  addToDoButton.addEventListener('click', () => showAddTodo());
  todoArea.appendChild(addToDoButton);
}

console.log('Todo list app initialized');
document.addEventListener('DOMContentLoaded', renderApp);
