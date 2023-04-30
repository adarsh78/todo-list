const todoInputElement = document.getElementById('todoInput');
const addUpdateBtnElement = document.getElementById('addupdate');
const addTextElement = document.getElementById('addtext');
const updateTextElement = document.getElementById('updatetext');
const todoListElement = document.getElementById('todo-list');

addUpdateBtnElement.addEventListener('click', performAddUpdate);

/**
 * {
 *    value: string,
 *    complete: boolean
 * }
 */
let todoList = [];
let updateIndex = -1;

function performAddUpdate(event) {
  event.preventDefault();

  if(updateIndex === -1) {
    addATodoItem();
  } else {
    updateTodoItem()
  }
}

function addATodoItem() {
  const todoText = todoInputElement.value;
  if (!todoText.length) return;

  const todo = {
    value: todoText,
    complete: false
  }

  todoList.push(todo);
  todoInputElement.value = '';

  updateStore();
  renderTodoList();
}

function renderTodoList() {
  let list = window.localStorage.getItem('todoList');
  if(!list) return;

  list = JSON.parse(list);
  todoList = list;

  const listToRender = list.map((listItem, index) => `
      <div class="list-item">
        <div style="${listItem.complete && 'text-decoration: line-through'}">${listItem.value}</div>
        <div>
          <button onclick="performEdit(${index})">edit</button>
          <button onclick="performDelete(${index})">delete</button>
          <button onclick="performComplete(${index})" style="${listItem.complete && 'display: none'}">Complete</button>
        </div>
      </div>
    `);
  todoListElement.innerHTML = listToRender.join('');
}

function performDelete(index) {
  const confirmDelete = window.confirm(`TODO Item: ${todoList[index]} \nAre you sure you want to delete this todo item?`);

  if (confirmDelete) {
    todoList = todoList.filter((item, i) => i !== index);
    updateStore();
    renderTodoList();
  }
}

function performEdit(index) {
  const todoItem = todoList[index];
  todoInputElement.value = todoItem.value;
  addTextElement.style.display = 'none';
  updateTextElement.style.display = 'block';
  updateIndex = index;
}

function updateTodoItem() {
  if (updateIndex === -1) {
    return;
  }

  const todoText = todoInputElement.value;
  todoList[updateIndex].value = todoText;
  todoList[updateIndex].complete = false;
  todoInputElement.value = '';

  reset();
  updateStore();
  renderTodoList();
}

function performComplete(index) {
  todoList[index].complete = true;

  updateStore();
  renderTodoList();
}

function updateStore() {
  window.localStorage.setItem('todoList', JSON.stringify(todoList));
}

function reset() {
  addTextElement.style.display = 'block';
  updateTextElement.style.display = 'none';
  updateIndex = -1;
}

renderTodoList();