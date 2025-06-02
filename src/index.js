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
  const sideBar = document.createElement('div');
  sideBar.className = 'sideBar-container';

  const sideBarHeader = document.createElement('h2');
  sideBarHeader.textContent = 'My Projects';

  sideBar.appendChild(sideBarHeader);
  projects.forEach(project => {
    const projectItem = document.createElement('div');
    projectItem.className = 'projectContainer';
    projectItem.textContent = project.name;

    if (project.id === currentProjectId) {
      projectItem.classList.add('selected');
    }

    projectItem.addEventListener('click', () => {
      document.querySelectorAll('.projectContainer.selected').forEach(item => item.classList.remove('selected'));
      projectItem.classList.add('selected');
      currentProjectId = project.id;
      displayToDos(project);
    });
    sideBar.appendChild(projectItem);
  });

  const addProjectButton = document.createElement('button');
  addProjectButton.className = 'projectContainer';
  addProjectButton.textContent = '➕';
  addProjectButton.addEventListener('click', () => {
    showAddProject();
  });
  sideBar.appendChild(addProjectButton);
  return sideBar;
}

function renderSideBar() {
  const oldSideBar = document.querySelector('.sideBar-container');
  const newSideBar = loadSideBar();
  if (oldSideBar) {
    oldSideBar.replaceWith(newSideBar);
  }
}

function showAddProject() {
  // Create the overlay (dim background)
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
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
  form.style.maxWidth = '90%';

  form.innerHTML = `
    <label>
      Project Name: <input type="text" id="projectName" required />
    </label><br/><br/>
    <button type="submit">Add</button>
    <button type="button" id="cancelBtn">Cancel</button>
  `;

  overlay.appendChild(form);
  document.body.appendChild(overlay);

  // Handle form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const projectName = form.querySelector('#projectName').value.trim();

    if (projectName) {
      addNewProject(projectName);
      renderSideBar();
    }
    document.body.removeChild(overlay);
  });

  // Handle cancel button
  form.querySelector('#cancelBtn').addEventListener('click', () => {
    document.body.removeChild(overlay);
  });

  // Handle clicking outside the modal
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      document.body.removeChild(overlay);
    }
  });
}

function addNewProject(projectTitle) {
  const nextId = projects.length > 0
    ? Math.max(...projects.map(p => p.id)) + 1
    : 1;

  projects.push({
    id: nextId,
    name: projectTitle,
    todos: []
  });
}

function showAddTodo() {
  // Create the overlay (dim background)
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
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
  form.style.maxWidth = '90%';

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
  document.body.appendChild(overlay);

  // Handle form submission
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
    document.body.removeChild(overlay);
  });

  // Handle cancel button
  form.querySelector('#cancelBtn').addEventListener('click', () => {
    document.body.removeChild(overlay);
  });

  // Handle clicking outside the modal
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      document.body.removeChild(overlay);
    }
  });
}

function addNewTodo(projectID, text, dueDate) {
  const project = projects.find(p => p.id === projectID);
  if (!project) return;

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

function onToggleComplete(todoId) {
  const currentProject = projects.find(p => p.id === currentProjectId);
  if (currentProject) {
    const todo = currentProject.todos.find(t => t.id === todoId);
    if (todo) {
      todo.completed = !todo.completed;
      displayToDos(currentProject);
    }
  }
}

function displayToDos(project) {
  const todoArea = document.getElementById('todoArea');
  todoArea.innerHTML = '';

  const targetProject = projects.find(p => p.id === project.id);
  if (!targetProject) return;

  targetProject.todos.forEach((todo, index) => {
    const todoItem = loadTodoItem(todo);

    // Create delete button
    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      targetProject.todos.splice(index, 1);
      displayToDos(project);
    });

    todoItem.appendChild(deleteButton);
    todoArea.appendChild(todoItem);
  });

  const addToDoButton = document.createElement('button');
  addToDoButton.className = 'add-Button';
  addToDoButton.textContent = 'Add ToDo';
  addToDoButton.addEventListener('click', () => showAddTodo());
  todoArea.appendChild(addToDoButton);

  setupDragAndDrop(todoArea, addToDoButton);
}

function getDragAfterElement(container, y) {
  const elements = [...container.querySelectorAll('.todo-item:not(.dragging)')];

  return elements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - (box.top + box.height / 2);

    if (offset < 0 && offset > closest.offset) {
      return { offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY, element: null }).element;
}

function setupDragAndDrop(todoArea, addToDoButton) {
  todoArea.replaceWith(todoArea.cloneNode(false)); // Clean slate
  const freshTodoArea = document.getElementById('todoArea');

  // Re-append all current todos (re-render) and add drag events
  const targetProject = projects.find(p => p.id === currentProjectId);
  if (!targetProject) return;

  if (!targetProject.todos.length) {
    const emptyWrapper = document.createElement('div');
    emptyWrapper.className = 'empty-state';

    const emptyMessage = document.createElement('p');
    emptyMessage.className = 'empty-message';
    emptyMessage.textContent = 'No tasks yet. Add one to get started!';

    const addToDoButton = document.createElement('button');
    addToDoButton.className = 'add-Button new-project';
    addToDoButton.textContent = 'Add ToDo';
    addToDoButton.addEventListener('click', () => showAddTodo());

    emptyWrapper.appendChild(emptyMessage);
    emptyWrapper.appendChild(addToDoButton);
    freshTodoArea.appendChild(emptyWrapper);

    return;
  }

  targetProject.todos.forEach(todo => {
    const todoItem = loadTodoItem(todo); // has drag events already

    // Add delete button again
    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      const index = targetProject.todos.findIndex(t => t.id === todo.id);
      if (index !== -1) {
        targetProject.todos.splice(index, 1);
        displayToDos(targetProject);
      }
    });

    todoItem.appendChild(deleteButton);
    freshTodoArea.appendChild(todoItem);
  });

  freshTodoArea.appendChild(addToDoButton);

  // Add drag handlers
  freshTodoArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    const dragging = document.querySelector('.dragging');
    const afterElement = getDragAfterElement(freshTodoArea, e.clientY);

    if (dragging && freshTodoArea.contains(dragging)) {
      if (afterElement && freshTodoArea.contains(afterElement)) {
        freshTodoArea.insertBefore(dragging, afterElement);
      } else {
        freshTodoArea.insertBefore(dragging, addToDoButton);
      }
    }
  });

  freshTodoArea.addEventListener('drop', () => {
    const newOrder = [...freshTodoArea.querySelectorAll('.todo-item')]
      .map(item => parseInt(item.dataset.id));

    if (targetProject) {
      targetProject.todos = newOrder
        .map(id => targetProject.todos.find(t => t.id === id))
        .filter(Boolean);
    }
  });
}




// Make onToggleComplete globally available for TodoItem.js
window.onToggleComplete = onToggleComplete;

console.log('Todo list app initialized');
document.addEventListener('DOMContentLoaded', renderApp);