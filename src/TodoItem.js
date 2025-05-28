// src/TodoItem.js

export default function loadTodoItem(todo) {
    // Create the elements
    const todoItem = document.createElement('div');
    todoItem.className = 'todo-item';
    todoItem.draggable = true;
    todoItem.dataset.id = todo.id;

    // Drag events
    todoItem.addEventListener('dragstart', (e) => {
        todoItem.classList.add('dragging');
        e.dataTransfer.setData('text/plain', todo.id);
    });

    todoItem.addEventListener('dragend', () => {
        todoItem.classList.remove('dragging');
    });

    // Create checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'todo-checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => onToggleComplete(todo.id));

    const todoText = document.createElement('span');
    todoText.textContent = todo.text;

    const label = document.createElement('label');
    const text = document.createTextNode('Due Date: ');
    label.appendChild(text);
    const todoDate = document.createElement('input');
    todoDate.type = 'date';
    todoDate.className = 'todo-date';
    todoDate.value = todo.dueDate || '';

    // Assemble the todo item
    todoItem.appendChild(checkbox);
    todoItem.appendChild(todoText);
    todoItem.appendChild(label);
    todoItem.appendChild(todoDate);

    return todoItem;
}