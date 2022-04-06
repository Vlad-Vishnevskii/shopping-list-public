'use strict';
(function () {

  const todoWrapper = document.querySelector('.todo-input');
  const form = todoWrapper.querySelector('form');
  const todoInputField = document.querySelector('.todo-input__field_input');
  const todoInput = todoInputField.querySelector('input');
  const itemTemplate = document.querySelector('#item')
  .content
  .querySelector('.todo-list__item');
  const todoList = document.querySelector('.todo-list');
  const fieldSelect = document.querySelector('.todo-input__field_select');
  const select = fieldSelect.querySelector('select');
  const clearButton = document.querySelector('.todo-input__reset-button');


  const renderPage = function (element, item) {
    if (localStorage.getItem(item) !== null) {
      element.innerHTML = localStorage.getItem(item);
    }
  }

  const saveElement = function (element, item) {
    const parsed = element.innerHTML;
    localStorage.setItem(item, parsed);
  }

  const clearToDo = function () {
    localStorage.clear();
    location.reload();
  }

  renderPage(todoList, 'shopping-list');


  const onTodoListClick = function (evt) {
    const target = evt.target;
    const currentItem = target.closest('.todo-list__item')
    if (target.closest('.todo-list__del-btn')) {
      currentItem.remove();
      saveElement(todoList, 'shopping-list');
    }

    if (target.closest('.todo-list__item-left-wrapper')) {
      currentItem.classList.toggle('todo-list__item_completed');
      saveElement(todoList, 'shopping-list');
    }
  }

  todoList.addEventListener('click', onTodoListClick)

  const addItem = function () {
    var valueSelect = select.value;
    const item = itemTemplate.cloneNode(true);
    const itemText = item.querySelector(".todo-list__item-text");
      if (todoInput.value != '') {
        itemText.textContent = todoInput.value;
        const fragment = document.createDocumentFragment();
        fragment.appendChild(item);
        todoList.appendChild(fragment);
      }

      if (valueSelect != 0) {
        itemText.textContent = valueSelect;
        const fragment = document.createDocumentFragment();
        fragment.appendChild(item);
        todoList.appendChild(fragment);
      }

    saveElement(todoList, 'shopping-list');
  }

  const onFormSubmit = function (evt) {
    evt.preventDefault();
    addItem();
    form.reset();
  }

  const onClearBtnClick = function () {
    clearToDo();
  }

  form.addEventListener('submit', onFormSubmit);
  clearButton.addEventListener('click', onClearBtnClick);

})();
