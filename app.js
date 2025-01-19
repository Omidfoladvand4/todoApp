let $ = document;
const inputElm = $.querySelector("#input");
const addButton = $.querySelector(".addList");
const clearButton = $.querySelector(".clearList");
const TodoListElm = $.querySelector(".todoContainer");
let todoArray = [];
function addNewTodo() {
  let newTodoTitle = inputElm.value;
  let newTodoObj = {
    id: todoArray.length + 1,
    title: newTodoTitle,
    complete: false,
  };
  inputElm.value = "";
  todoArray.push(newTodoObj);
  setLocalStorage(todoArray);
  todoGenerator(todoArray);
}
function setLocalStorage(todoList) {
  localStorage.setItem("todo", JSON.stringify(todoList));
}
function todoGenerator(todoList) {
  let newTodoLiElm,
    newTodoTitleElm,
    newTodoBtnComplete,
    newTodoBtnDelete,
    newDivBtn;
  TodoListElm.innerHTML = "";
  todoList.forEach(function (todo) {
    newTodoLiElm = $.createElement("li");
    newTodoLiElm.className = "todoItem";

    newTodoTitleElm = $.createElement("p");
    newTodoTitleElm.className = "todoTitle";
    newTodoTitleElm.innerHTML = todo.title;
    newTodoTitleElm.addEventListener("click", function (event) {
      let newName = prompt("Enter new Todo");
      event.target.innerHTML = newName;
    });

    newTodoBtnComplete = $.createElement("button");
    newTodoBtnComplete.className = "complete";
    newTodoBtnComplete.innerHTML = "Complete";
    newTodoBtnComplete.setAttribute("onclick", "editTodo(" + todo.id + ")");
    newTodoBtnDelete = $.createElement("button");
    newTodoBtnDelete.className = "delete";
    newTodoBtnDelete.innerHTML = "Delete";
    newTodoBtnDelete.setAttribute("onclick", "removeTodo(" + todo.id + ")");
    newDivBtn = $.createElement("div");
    newDivBtn.className = "btn";

    if (todo.complete) {
      newTodoBtnComplete.innerHTML = "uncomplete";
      newTodoTitleElm.style.textDecoration = "line-through";
      newTodoTitleElm.style.color = "gray";
    }
    newDivBtn.append(newTodoBtnComplete, newTodoBtnDelete);
    newTodoLiElm.append(newTodoTitleElm, newDivBtn);
    TodoListElm.append(newTodoLiElm);
  });
}

function getLocalStorage() {
  let localStorageTodo = JSON.parse(localStorage.getItem("todo"));
  if (localStorageTodo) {
    todoArray = localStorageTodo;
  } else {
    todoArray = [];
  }
  todoGenerator(todoArray);
}
function clearAllTodo() {
  todoArray = [];
  todoGenerator(todoArray);
  localStorage.removeItem("todo");
}

function removeTodo(todoId) {
  let localStorageTodo = JSON.parse(localStorage.getItem("todo"));
  todoArray = localStorageTodo;
  let mainTodoIndex = localStorageTodo.findIndex(function (todo) {
    return todo.id === todoId;
  });
  todoArray.splice(mainTodoIndex, 1);

  setLocalStorage(todoArray);
  todoGenerator(todoArray);
}
function editTodo(todoId) {
  todoArray = JSON.parse(localStorage.getItem("todo"));

  todoArray.forEach(function (todo) {
    if (todo.id === todoId) {
      todo.complete = !todo.complete;
    }
  });

  setLocalStorage(todoArray);
  todoGenerator(todoArray);
}

window.addEventListener("load", getLocalStorage);
addButton.addEventListener("click", function () {
  if (inputElm.value) {
    addNewTodo();
    inputElm.focus();
  }
});

clearButton.addEventListener("click", clearAllTodo);
inputElm.addEventListener("keydown", function (event) {
  if (inputElm.value) {
    if (event.code === "Enter") {
      addNewTodo();
    }
  }
  inputElm.focus();
});
