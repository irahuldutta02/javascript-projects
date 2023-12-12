let todoS = [];
let todoList = document.getElementById("todo-data-list");
let saveButton = document.getElementById("save-todo");
let inputBar = document.getElementById("todo-input-bar");
let pendingToDos = document.getElementById("get-todo");

/**
 * Get pending todo items on click pending button
 */
pendingToDos.addEventListener("click", () => {
  todoS = todoS.filter((todo) => todo.status != "Finished");
  rerender();
});

/**
 * Toggle save button on keyup
 */
inputBar.addEventListener("keyup", function toggle() {
  let toDoText = inputBar.value;
  if (toDoText.length == 0) {
    if (saveButton.classList.contains("disabled")) return;
    saveButton.classList.add("disabled");
  } else if (saveButton.classList.contains("disabled")) {
    saveButton.classList.remove("disabled");
  }
});

/**
 * Save todo item on click save button
 */
saveButton.addEventListener("click", function getText() {
  let toDoText = inputBar.value;
  if (toDoText.length == 0) return;
  let todo = {
    text: toDoText,
    status: "in progress",
    finishBtnTxt: "Finished",
  };
  todoS.push(todo);
  addTodo(todo, todoS.length);
  inputBar.value = "";
});

/**
 * Rerender todo list
 */
function rerender() {
  todoList.innerHTML = "";
  todoS.forEach((element, idx) => {
    addTodo(element, idx + 1);
  });
}

/**
 * Remove todo item
 * @param {*} event
 */
function removeToDo(event) {
  let deleteBtnPressed = event.target;
  let indexToBeRemoved = Number(deleteBtnPressed.getAttribute("todo-idx"));
  todoS.splice(indexToBeRemoved, 1);
  rerender();
}

/**
 * Mark todo item as finished
 * @param {*} event
 */
function finishToDo(event) {
  let finishBtnPressed = event.target;
  let indexToBeUpdated = Number(finishBtnPressed.getAttribute("todo-idx"));
  if (todoS[indexToBeUpdated].status == "Finished") {
    todoS[indexToBeUpdated].status = "in progress";
    todoS[indexToBeUpdated].finishBtnTxt = "Finished";
  } else {
    todoS[indexToBeUpdated].status = "Finished";
    todoS[indexToBeUpdated].finishBtnTxt = "Undo";
  }

  todoS.sort((a, b) => {
    if (a.status == "Finished") return 1;
    return -1;
  });
  rerender();
}

/**
 * Edit todo item
 * @param {*} event
 */
function editToDo(event) {
  let editBtnPressed = event.target;
  let indexToBeEdited = Number(editBtnPressed.getAttribute("todo-idx"));
  let detailDiv = document.querySelector(`div[todo-idx="${indexToBeEdited}"]`);
  let input = document.querySelector(`input[todo-idx="${indexToBeEdited}"]`);
  detailDiv.style.display = `none`;
  input.type = `text`;
  input.value = detailDiv.textContent;
}

/**
 * Save edited todo item
 * @param {*} event
 */
function saveEditedToDo(event) {
  let input = event.target;
  let indexToBeEdited = Number(input.getAttribute("todo-idx"));
  let detailDiv = document.querySelector(`div[todo-idx="${indexToBeEdited}"]`);

  if (event.keyCode == 13) {
    detailDiv.textContent = input.value;
    detailDiv.style.display = "block";
    input.value = "";
    input.type = "hidden";
  }
}

/**
 * Add new todo
 * @param {*} todo
 * @param {*} toNum
 */
function addTodo(todo, toNum) {
  let todoRow = document.createElement("div");
  let todoItem = document.createElement("div");
  let todoNo = document.createElement("div");
  let todoDetails = document.createElement("div");
  let todoStatus = document.createElement("div");
  let todoAction = document.createElement("div");
  let deleteBtn = document.createElement("button");
  let finishBtn = document.createElement("button");
  let editBtn = document.createElement("button");
  let hiddenInput = document.createElement("input");
  let hr = document.createElement("hr");

  todoRow.classList.add("row");
  todoItem.classList.add(
    "todo-item",
    "d-flex",
    "flex-row",
    "justify-content-between",
    "align-items-center"
  );
  todoNo.classList.add("todo-no");
  todoDetails.classList.add("todo-details");
  todoStatus.classList.add("todo-status", "d-flex", "justify-content-start");
  todoAction.classList.add(
    "todo-action",
    "d-flex",
    "justify-content-start",
    "gap-2"
  );
  deleteBtn.classList.add("btn", "btn-danger", "delete-todo");
  finishBtn.classList.add("btn", "btn-success", "finish-todo");
  editBtn.classList.add("btn", "btn-warning");
  hiddenInput.classList.add("form-control", "todo-details");

  deleteBtn.setAttribute("todo-idx", toNum - 1);
  finishBtn.setAttribute("todo-idx", toNum - 1);
  editBtn.setAttribute("todo-idx", toNum - 1);
  todoDetails.setAttribute("todo-idx", toNum - 1);
  hiddenInput.setAttribute("todo-idx", toNum - 1);
  hiddenInput.type = "hidden";
  hiddenInput.addEventListener("keypress", saveEditedToDo);

  deleteBtn.onclick = removeToDo;
  finishBtn.onclick = finishToDo;
  editBtn.onclick = editToDo;

  todoNo.textContent = `${toNum}`;
  todoDetails.textContent = todo.text;
  todoStatus.textContent = todo.status;
  deleteBtn.textContent = "Delete";
  finishBtn.textContent = todo.finishBtnTxt;
  editBtn.textContent = "Edit";

  todoAction.appendChild(deleteBtn);
  todoAction.appendChild(finishBtn);
  todoAction.appendChild(editBtn);

  todoItem.appendChild(todoNo);
  todoItem.appendChild(hiddenInput);
  todoItem.appendChild(todoDetails);
  todoItem.appendChild(todoStatus);
  todoItem.appendChild(todoAction);

  todoRow.appendChild(todoItem);
  todoRow.appendChild(hr);

  todoList.appendChild(todoRow);
}
