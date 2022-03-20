const toDoForm = document.querySelector(".todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".todo-list");

const TODOS_KEY = "todos";

let toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
  const deleteTarget = event.target.parentElement;
  deleteTarget.remove();
  toDos = toDos.filter((toDoObj) => toDoObj.id !== parseInt(deleteTarget.id));
  saveToDos();
}

function paintToDo(newToDoObject) {
  const listItem = document.createElement("li");
  listItem.id = newToDoObject.id;
  const span = document.createElement("span");
  span.innerText = newToDoObject.text;
  const button = document.createElement("button");
  button.innerText = "❌";
  button.addEventListener("click", deleteToDo);
  listItem.appendChild(button);
  listItem.appendChild(span);
  toDoList.appendChild(listItem);
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newToDo = toDoInput.value;
  toDoInput.value = "";
  const newToDoObject = {
    id: Date.now(),
    text: newToDo,
  };
  toDos.push(newToDoObject);
  paintToDo(newToDoObject);
  saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);
if (savedToDos) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}
