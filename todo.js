const todoInputElement = document.getElementById('todoInput');
const addBtnElement = document.getElementById('add');
const updateBtnElement = document.getElementById('update');
const todoListElement = document.getElementById('todo-list');

addBtnElement.addEventListener('click', addATodoItem);
updateBtnElement.addEventListener('click', updateTodoItem);

let todoList = [];
let updateIndex = -1;

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
        <div>
          <button onclick="performEdit(${index})">edit</button>
          <button onclick="performDelete(${index})">delete</button>
        </div>
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

function performEdit(index) {
  const todoItem = todoList[index];
  todoInputElement.value = todoItem;
  addBtnElement.style.display = 'none';
  updateBtnElement.style.display = 'block';
  updateIndex = index;
}

function updateTodoItem(event) {
  event.preventDefault();

  if (updateIndex === -1) {
    return;
  }

  const todoText = todoInputElement.value;
  todoList[updateIndex] = todoText;

  reset();
  renderTodoList();
}

function reset() {
  addBtnElement.style.display = 'block';
  updateBtnElement.style.display = 'none';
  updateIndex = -1;
}

renderTodoList();