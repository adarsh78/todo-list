# TODO List App
## This is a TODO List app by which we can create, update or delete our todo.

### Code for adding a list 

'
function addATodoItem(event) {
  event.preventDefault();

  const todoText = todoInputElement.value;
  if (!todoText.length) return;

  todoList.push(todoText);
  todoInputElement.value = '';

  renderTodoList();
}
'

### Code for deleting a list

'
function performDelete(index) {
  const confirmDelete = window.confirm(`TODO Item: ${todoList[index]} \nAre you sure you want to delete this todo item?`);

  if (confirmDelete) {
    todoList = todoList.filter((item, i) => i !== index);
    renderTodoList();
  }

}
'

### Rendering the lists

'
function renderTodoList() {
  const listToRender = todoList.map((listItem, index) => `
      <div class="list-item">
        <div>${listItem}</div>
        <button onclick="performDelete(${index})">delete</button>
      </div>
    `);
  todoListElement.innerHTML = listToRender.join('');
}
'
