const todoInput = document.querySelector('.todo__input');
const todoBtn = document.querySelector('.todo__btn');
const todoList = document.querySelector('.todo__list');
const gradientBox = document.getElementById('gradient-box');
const filterButtons = document.querySelectorAll('.btn-filters');
const todoFilter = document.querySelector('.todo__filters')
let angle = 0;

const loadTasks = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=4');
    const todos = await response.json()
    todos.forEach(todo => {
      let li = document.createElement('li');
      li.innerHTML = todo.title

      let span = document.createElement('span');
      span.innerHTML = '\u00d7';
      li.append(span);

      let remind = document.createElement('div');
      remind.innerHTML = '&#9743';
      li.append(remind);

      todoList.append(li);
    })
    saveData();
  } catch (err) {
    console.log('Ошибка');
  }
}

const updateGradient = () => {
  angle = (angle + 1) % 360;
  gradientBox.style.background = `linear-gradient(${angle}deg, green, goldenrod)`;
}

const addTask = () => {
  if (todoInput.value === '') {
    alert('Введите задачу');
  } else {
    let li = document.createElement('li');
    li.innerHTML = todoInput.value;
    todoList.append(li);
    let span = document.createElement('span');
    span.innerHTML = '\u00d7';
    li.append(span);
    let remind = document.createElement('div')
    remind.innerHTML = '&#9743';  //&#9742;
    li.append(remind)
  }

  todoInput.value = '';
  saveData();
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

todoBtn.addEventListener('click', () => {
  addTask();
});


const toggleTasks = (task) => {
    task.classList.toggle('checked')
}

const removeTask = (task) => {
    task.remove()
}

const setReminder = (reminderEl, task) => {
    if (task.classList.contains('checked')) {
        alert('Задача уже выполнена');
        return;
    }

    const sec = prompt('Введите время в секундах: ')

    if (!sec || isNaN(sec)) {
        alert('Некорректный ввод')
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
    }

    saveData();
}

todoList.addEventListener('click', (e) => {
    const target = e.target
    const taskItem = target.closest('li')

    if (!taskItem) return


    switch (target.tagName) {
        case 'LI':
            toggleTasks(taskItem);
            break
        case 'SPAN':
            removeTask(taskItem)
            break
        case 'DIV':
            setReminder(target, taskItem)
            break
    }
    saveData();
})

// todoList.addEventListener('click', (e) => {
//   if (e.target.tagName === 'LI') {
//     e.target.classList.toggle('checked');
//     const remindBtn = e.target.querySelector('div');
//     if (remindBtn) {
//       remindBtn.classList.toggle('hidden', e.target.classList.contains('checked'));
//     }
//     saveData();
//   } else if (e.target.tagName === 'SPAN') {
//     e.target.parentElement.remove();
//     saveData();
//   } else if (e.target.tagName === 'DIV') {
//     if (e.target.closest('li').classList.contains('checked')) return;
//
//     const sec = prompt('Введите время напоминания в секундах:');
//     if (sec && !isNaN(sec)) {
//       const time = parseInt(sec) * 1000;
//       const taskItem = e.target.closest('li');
//
//       e.target.innerHTML = '&#9742;';
//       e.target.classList.add('remind');
//
//       setTimeout(() => {
//         if (!taskItem.classList.contains('checked')) {
//           e.target.innerHTML = '&#9743;';
//           e.target.classList.remove('remind');
//           saveData();
//           alert(`Напоминание о задаче - ${taskItem.firstChild.textContent}`);
//         }
//       }, time);
//
//       saveData();
//     }
//   }
// });



showData();

setInterval(updateGradient, 20);

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

// todoFilter.addEventListener('click', (e) => {
//   if (e.target.classList.contains('btn-filters')) {
//     filter(e.target);
//
//     const tasks = document.querySelectorAll('.todo__list li');
//
//     if (e.target.classList.contains('todo__all-tasks')) {
//       // Показать все задачи
//       tasks.forEach(task => {
//         task.style.display = 'flex';
//       });
//     } else if (e.target.classList.contains('todo__done-tasks')) {
//       tasks.forEach(task => {
//         if (task.classList.contains('checked')) {
//           task.style.display = 'flex';
//         } else {
//           task.style.display = 'none';
//         }
//       });
//     } else if (e.target.classList.contains('todo__not-done-tasks')) {
//       tasks.forEach(task => {
//         if (!task.classList.contains('checked')) {
//           task.style.display = 'flex';
//         } else {
//           task.style.display = 'none';
//         }
//       });
//     }
//   }
// });

const filter = (clickedButton) => {

  filterButtons.forEach(btn => {
    btn.classList.remove('pick');
  });

  clickedButton.classList.add('pick');
}

