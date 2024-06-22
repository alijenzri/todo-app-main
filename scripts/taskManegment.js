let storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
let checkedTasks = JSON.parse(localStorage.getItem('checkedTasks')) || [];
const todoInput = document.querySelector('.todo-text-input');
const todoList = document.querySelector('.todo-list');

function taskExists(taskName) {
    return storedTasks.includes(taskName);
}

function itemLeft() {
    document.querySelector('.items-left').innerHTML = `${storedTasks.length - checkedTasks.length} items left`;
}

function activeTasks() {
    let html = '';
    storedTasks.forEach((task) => {
        if (!checkedTasks.includes(task)) {
            html += `
            <div class="todo-item " data-task-name="${task}">
            <input type="radio" class="todo-radio">
            <p class="todo-text">${task}</p>
            <button class="delete-btn">
                <img src="images/icon-cross.svg" alt="cross icon" class="delete-icon">
            </button>
            </div>
            `;
        }
    });
    todoList.innerHTML = html;
    attachEventListeners();
}

function showCompletedTasks() {
    let html = '';
    checkedTasks.forEach((task) => {
        const isChecked = checkedTasks.includes(task);
        html += `
        <div class="todo-item completed" data-task-name="${task}">
          <img src="images/icon-check.svg" alt="check icon" class="check-icon">
          <p class="todo-text">${task}</p>
          <button class="delete-btn">
            <img src="images/icon-cross.svg" alt="cross icon" class="delete-icon">
          </button>
        </div>
        `;
    });
    todoList.innerHTML = html;
    attachEventListeners();
}

function showTasks() {
    let html = '';
    storedTasks.forEach((task) => {
        const isChecked = checkedTasks.includes(task);
        html += `
        <div class="todo-item ${isChecked ? 'completed' : ''}" data-task-name="${task}">
          ${isChecked ? '<img src="images/icon-check.svg" alt="check icon" class="check-icon">' : '<input type="radio" class="todo-radio">'}
          <p class="todo-text">${task}</p>
          <button class="delete-btn">
            <img src="images/icon-cross.svg" alt="cross icon" class="delete-icon">
          </button>
        </div>
        `;
    });
    todoList.innerHTML = html;
    attachEventListeners();
    itemLeft();
}

function attachEventListeners() {
    todoList.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', () => {
            const taskName = button.parentElement.dataset.taskName;
            const index = storedTasks.indexOf(taskName);
            if (index !== -1) {
                storedTasks.splice(index, 1);
                const checkedIndex = checkedTasks.indexOf(taskName);
                if (checkedIndex !== -1) {
                    checkedTasks.splice(checkedIndex, 1);
                }
                updateTasks();
                showTasks();
            }
        });
    });

    todoList.querySelectorAll('.todo-radio').forEach(radio => {
        radio.addEventListener('click', () => {
            const taskItem = radio.parentElement;
            const taskName = taskItem.dataset.taskName;
            taskItem.classList.add('completed');
            radio.outerHTML = '<img src="images/icon-check.svg" alt="check icon" class="check-icon">';
            if (!checkedTasks.includes(taskName)) {
                checkedTasks.push(taskName);
                updateTasks();
            }
        });
    });
}

function updateTasks() {
    localStorage.setItem('tasks', JSON.stringify(storedTasks));
    localStorage.setItem('checkedTasks', JSON.stringify(checkedTasks));
    itemLeft();
}

// add task
if (!todoInput) {
    console.error('Todo input element not found!');
} else {
    todoInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const todoInputValue = todoInput.value.trim();
            if (!todoInputValue) return;

            if (taskExists(todoInputValue)) {
                alert(`Task '${todoInputValue}' already exists!`);
                return;
            }

            storedTasks.push(todoInputValue);
            todoInput.value = '';
            updateTasks();
            showTasks();
        }
    });
}


document.addEventListener('DOMContentLoaded', () => {
    showTasks();
    document.querySelector('.js-all').classList.add('selected');

    // Controls section
    document.querySelector('.js-all').addEventListener('click', () => {
        showTasks();
        document.querySelector('.js-all').classList.add('selected');
        document.querySelector('.js-active').classList.remove('selected');
        document.querySelector('.js-completed').classList.remove('selected');
    });

    document.querySelector('.js-active').addEventListener('click', () => {
        activeTasks();
        document.querySelector('.js-active').classList.add('selected');
        document.querySelector('.js-all').classList.remove('selected');
        document.querySelector('.js-completed').classList.remove('selected');
    });

    document.querySelector('.js-completed').addEventListener('click', () => {
        showCompletedTasks();
        document.querySelector('.js-completed').classList.add('selected');
        document.querySelector('.js-all').classList.remove('selected');
        document.querySelector('.js-active').classList.remove('selected');
    });

    document.querySelector('.clear-completed').addEventListener('click', () => {
        checkedTasks.forEach((task) => {
            const index = storedTasks.indexOf(task);
            if (index !== -1) {
                storedTasks.splice(index, 1);
            }
        });
        checkedTasks = [];
        updateTasks();
        showTasks();
    });
});

