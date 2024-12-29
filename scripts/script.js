let $ = document;
let addButton = $.querySelector(".addbutton");
let addBoxButton = $.querySelector(".addbox__button");
let overallLayer = $.querySelector(".overall");
let xButton = $.querySelector(".addbox__heading--right");
let todoInput = $.querySelector("#todo_input");
let allCols = Array.from($.getElementsByClassName("col-1-of-4"));
let firstCol = $.querySelector(".col_1");
let taskBox;
let mainTask;
let deleteTask;
let numberFlag = 1;

allCols.forEach(function (item) {
  item.addEventListener("dragleave", function (event) {
    event.target.style.transform = "scale(1)";
    console.log("left");
  });
});

addButton.addEventListener("click", function () {
  overallLayer.style.display = "initial";
  todoInput.focus();
});

xButton.addEventListener("click", function () {
  overallLayer.style.display = "none";
});

$.body.addEventListener("keydown", function (event) {
  if (overallLayer.style.display === "initial") {
    if (event.key === "Escape") {
      overallLayer.style.display = "none";
    }
  }
});

todoInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    appendNewTask();
  }
});

addBoxButton.addEventListener("click", appendNewTask);

function appendNewTask() {
  if (todoInput.value.trim() === "") {
    return;
  }
  taskBox = $.createElement("div");
  taskBox.classList.add("task_box", "col_item", numberFlag);
  numberFlag++;
  taskBox.draggable = "true";

  taskBox.addEventListener("dragstart", function (event) {
    dragStartHandler(event);
  });
  mainTask = $.createElement("span");
  mainTask.classList.add("main_task");
  deleteTask = $.createElement("span");
  deleteTask.classList.add("delete_task");
  deleteTask.textContent = "X";

  deleteTask.addEventListener("click", function (event) {
    event.target.parentElement.remove();
  });
  mainTask.textContent = todoInput.value.trim();
  taskBox.append(mainTask, deleteTask);
  firstCol.append(taskBox);
  todoInput.value = "";
  overallLayer.style.display = "none";
}

function dragStartHandler(event) {
  event.dataTransfer.setData("classOfElem", event.target.classList[2]);
}

function dropHandler(event) {
  let classOfElem = event.dataTransfer.getData("classOfElem");
  let currentElem = $.getElementsByClassName(classOfElem);
  event.target.append(currentElem[0]);
  event.target.style.transform = "scale(1)";
}

function dragOverHandler(event) {
  event.preventDefault();
  console.log("over");
  event.target.style.transform = "scale(0.98)";
}
