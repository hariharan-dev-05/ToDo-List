document.addEventListener('DOMContentLoaded', loadTasks);
document.getElementById('add-button').addEventListener('click', addTask);
document.getElementById('todo-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

function addTask() {
    const taskInput = document.getElementById('todo-input');
    const taskValue = taskInput.value.trim();

    if (taskValue !== '') {
        const taskList = document.getElementById('todo-list');
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <span>${taskValue}</span>
            <button onclick="removeTask(this)">&#10006;</button>
        `;
        taskList.appendChild(taskItem);
        saveTask(taskValue);
        taskInput.value = '';
    }
}

function removeTask(taskButton) {
    const taskItem = taskButton.parentElement;
    const taskValue = taskItem.querySelector('span').textContent.trim();
    taskItem.style.animation = 'fadeOut 0.5s ease-in-out';
    taskItem.addEventListener('animationend', () => {
        taskItem.remove();
        deleteTask(taskValue);
    });
}

function saveTask(taskValue) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(taskValue);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTask(taskValue) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task !== taskValue);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(taskValue => {
        const taskList = document.getElementById('todo-list');
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <span>${taskValue}</span>
            <button onclick="removeTask(this)">&#10006;</button>
        `;
        taskList.appendChild(taskItem);
    });
}