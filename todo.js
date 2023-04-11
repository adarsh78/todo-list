const todoInputElement = document.getElementById('todoInput');
const addBtnElement = document.getElementById('add');
const todoListElement = document.getElementById('todo-list');

addBtnElement.addEventListener('click', addATodoItem);

const todoList = [];

function addATodoItem(event) {
  event.preventDefault();

  const todoText = todoInputElement.value;
  todoList.push(todoText);
  todoInputElement.value = '';


  renderTodoList();
}


function renderTodoList() {
  const listToRender = todoList.map(listItem => `
      <div class="list-item">
        <div>${listItem}</div>
        <button>delete</button>
      </div>
    `);
  todoListElement.innerHTML = listToRender.join('');
}

renderTodoList();