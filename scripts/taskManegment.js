const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
const todoInput = document.querySelector('.todo-text-input');
const todoList = document.querySelector('.todo-list');


function taskExists(taskName) {
    return storedTasks.includes(taskName);
}

function showTasks() {
    let html = '';
    storedTasks.forEach((task) => {
        html += `
        <div class="todo-item" data-task-name="${task}">
          <input type="radio" class="todo-radio">
          <p class="todo-text">${task}</p>
          <button class="delete-btn">
            <img src="images/icon-cross.svg" alt="cross icon" class="delete-icon">
          </button>
        </div>
        `;
    });
    todoList.innerHTML = html;

    todoList.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', () => {
            const taskName = button.parentElement.dataset.taskName;
            const index = storedTasks.indexOf(taskName);
            if (index !== -1) {
                storedTasks.splice(index, 1);
                updateTasks();
                showTasks();
            }
        });
    });
}

function updateTasks() {
    localStorage.setItem('tasks', JSON.stringify(storedTasks));
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
                alert(`Task '${todoInputValue}' already exists.`);
                return;
            }

            storedTasks.push(todoInputValue);
            todoInput.value = '';
            updateTasks();
            showTasks();
        }
    });
}

showTasks();
