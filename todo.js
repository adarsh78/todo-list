const todoInputElement = document.getElementById('todoInput');
const addBtnElement = document.getElementById('add');
const todoListElement = document.getElementById('todo-list');

addBtnElement.addEventListener('click', addATodoItem);

let todoList = [];

function addATodoItem(event) {
  event.preventDefault();

  const todoText = todoInputElement.value;
  if (!todoText.length) return;

  todoList.push(todoText);
  todoInputElement.value = '';

  renderTodoList();
}

function renderTodoList() {
  const listToRender = todoList.map((listItem, index) => `
      <div class="list-item">
        <div>${listItem}</div>
        <button onclick="performDelete(${index})">delete</button>
      </div>
    `);
  todoListElement.innerHTML = listToRender.join('');
}

function performDelete(index) {
  const confirmDelete = window.confirm(`TODO Item: ${todoList[index]} \nAre you sure you want to delete this todo item?`);

  if (confirmDelete) {
    todoList = todoList.filter((item, i) => i !== index);
    renderTodoList();
  }

}

renderTodoList();