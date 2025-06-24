const todoInput = document.querySelector('.todo__input');
const todoBtn = document.querySelector('.todo__btn');
const todoList = document.querySelector('.todo__list');
const gradientBox = document.getElementById('gradient-box');
const filterButtons = document.querySelectorAll('.btn-filters');
const todoFilter = document.querySelector('.todo__filters')
let angle = 0;

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
  todoList.innerHTML = localStorage.getItem('data');
};

todoBtn.addEventListener('click', () => {
  addTask();
});

todoList.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    e.target.classList.toggle('checked');
    saveData();
  } else if (e.target.tagName === 'SPAN') {
    e.target.parentElement.remove();
    saveData();
  } else if (e.target.tagName === 'DIV') {
    e.target.innerHTML = '&#9742';
    saveData();
  }
});

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

