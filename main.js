const todoInput = document.querySelector('.todo__input');
const todoBtn = document.querySelector('.todo__btn');
const todoList = document.querySelector('.todo__list');
const gradientBox = document.getElementById('gradient-box');
const filterButtons = document.querySelectorAll('.btn-filters');
const todoFilter = document.querySelector('.todo__filters');
let angle = 0;


const loadTasks = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=4');
        const todos = await response.json();
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.classList.add('.todo-item');
            li.innerHTML = todo.title;

            const span = document.createElement('span');
            span.classList.add('.todo-remove');
            span.innerHTML = '\u00d7';
            li.append(span);

            const remind = document.createElement('div');
            remind.classList.add('.todo-remind');
            remind.innerHTML = '&#9743';
            li.append(remind);

            todoList.append(li);
        });
        saveData();
    } catch (err) {
        console.log('Ошибка');
    }
};

const updateGradient = () => {
    angle = (angle + 1) % 360;
    gradientBox.style.background = `linear-gradient(${angle}deg, green, goldenrod)`;
};

const addTask = () => {
    if (todoInput.value === '') {
        alert('Введите задачу');
    } else {
        const li = document.createElement('li');
        li.classList.add('.todo-item');
        li.innerHTML = todoInput.value;
        todoList.append(li);
        const span = document.createElement('span');
        span.classList.add('.todo-remove');
        span.innerHTML = '\u00d7';
        li.append(span);
        const remind = document.createElement('div');
        remind.classList.add('.todo-remind');
        remind.innerHTML = '&#9743';  //&#9742;
        li.append(remind);
    }

    todoInput.value = '';
    saveData();
};

const filter = (clickedButton) => {

    filterButtons.forEach(btn => {
        btn.classList.remove('pick');
    });

    clickedButton.classList.add('pick');
};

const saveData = () => {
    localStorage.setItem('data', todoList.innerHTML);
};
const showData = () => {

    const savedData = localStorage.getItem('data');

    if (savedData) {
        todoList.innerHTML = savedData;
    } else {

        loadTasks();
    }
};

const toggleTasks = (task) => {
    task.classList.toggle('checked');
};

const removeTask = (task) => {
    task.remove();
};

const setReminder = (reminderEl, task) => {
    if (task.classList.contains('checked')) {
        alert('Задача выполнена');
        return;
    }

    const sec = prompt('Введите время в секундах: ');

    if (!sec || isNaN(sec)) {
        alert('Некорректный ввод');
    } else {
        const timeInSec = parseInt(sec) * 1000;

        reminderEl.innerHTML = '&#9742;';
        reminderEl.classList.add('remind');

        setTimeout(() => {
            reminderEl.innerHTML = '&#9743;';
            reminderEl.classList.remove('remind');
            saveData();
            alert(`Напоминание о задаче - ${task.firstChild.textContent}`);
        }, timeInSec);
        saveData();
    }
};

todoBtn.addEventListener('click', () => {
    addTask();
});
todoList.addEventListener('click', (e) => {
    const target = e.target;
    const taskItem = target.closest('li');

    if (!taskItem) return;

    switch (target.tagName) {
        case 'LI':
            toggleTasks(taskItem);
            break;
        case 'SPAN':
            removeTask(taskItem);
            break;
        case 'DIV':
            setReminder(target, taskItem);
            break;
    }
    saveData();
});

todoFilter.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-filters')) {
        filter(e.target);
        const filterType = e.target.dataset.filter;
        const tasks = document.querySelectorAll('.todo__list li');

        tasks.forEach(task => {
            task.style.display =
                filterType === 'all' ||
                (filterType === 'done' && task.classList.contains('checked')) ||
                (filterType === 'active' && !task.classList.contains('checked'))
                    ? 'flex' : 'none';
        });
    }
});

showData();

setInterval(updateGradient, 20);



