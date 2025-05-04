// src/TodoItem.js

export default function loadTodoItem(todo) {
    // Create the elements
    const todoItem = document.createElement('div');
    todoItem.className = 'todo-item';

    // Create checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'todo-checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => onToggleComplete(todo.id));

    const todoText = document.createElement('span');
    todoText.textContent = todo.text;

    const todoDate = document.createElement('input');
    todoDate.type = 'date';
    todoDate.className = 'todo-date';
    todoDate.value = todo.dueDate || '';

    // Create delete button
    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => onDelete(todo.id));

    // Assemble the todo item
    todoItem.appendChild(checkbox);
    todoItem.appendChild(todoText);
    todoItem.appendChild(todoDate);
    todoItem.appendChild(deleteButton);

    return todoItem;
}