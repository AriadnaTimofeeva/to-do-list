const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

document.addEventListener('DOMContentLoaded', loadTasks);

// ф-ция для добавления задач:
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const task = {
        text: taskText,
        completed: false
    };

    createTaskElement(task);
    saveTasks();
    taskInput.value = ''; // очищение поле ввода
}

// ф-ция для создания элемента задачи:
function createTaskElement(task) {
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    const span = document.createElement('span');
    span.textContent = task.text;
    if (task.completed) {
        span.classList.add('completed');
    }
    const button = document.createElement('button');
    button.textContent = 'Удалить';
    button.classList.add('deleteBtn');

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(button);

    checkbox.addEventListener('change', toggleTaskCompletion);
    button.addEventListener('click', deleteTask);

    taskList.appendChild(li);
}


// ф-ция для удаления задачи:
function deleteTask(event) {
    const li = event.target.parentElement;
    li.remove();
    saveTasks();
}

// ф-ция для отметки выполнения задачи:
function toggleTaskCompletion(event) {
    const li = event.target.parentElement;
    const span = li.querySelector('span');
    
    span.classList.toggle('completed');
    saveTasks();
}

// ф-ция для сохранения задач:
function saveTasks() {
    const tasks = [];
    const items = taskList.querySelectorAll('li');
    
    items.forEach(item => {
        const text = item.querySelector('span').textContent;
        const completed = item.querySelector('input').checked;
        tasks.push({ text, completed });
    });
    
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// ф-ция для загрузки задач:
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    tasks.forEach(task => {
        createTaskElement(task);
    });
}

addTaskBtn.addEventListener('click', addTask);
