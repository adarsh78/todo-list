const todoInputElement = document.getElementById('todoInput');
const addUpdateBtnElement = document.getElementById('addupdate');
const addTextElement = document.getElementById('addtext');
const updateTextElement = document.getElementById('updatetext');
const todoListElement = document.getElementById('todo-list');

addUpdateBtnElement.addEventListener('click', performAddUpdate);

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

  todoList.push(todoText);
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
    updateStore();
    renderTodoList();
  }
}

function performEdit(index) {
  const todoItem = todoList[index];
  todoInputElement.value = todoItem;
  addTextElement.style.display = 'none';
  updateTextElement.style.display = 'block';
  updateIndex = index;
}

function updateTodoItem() {
  if (updateIndex === -1) {
    return;
  }

  const todoText = todoInputElement.value;
  todoList[updateIndex] = todoText;
  todoInputElement.value = '';

  reset();
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