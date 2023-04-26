var ToDoButton = document.querySelector(".todo");
var CompletedButton = document.querySelector(".completed");
var ToDoTable = document.getElementById("to-do-table");
var CompletedTable = document.getElementById("completed-table");

CompletedTable.setAttribute("hidden", "hidden");
CompletedTable.style.display = "none";

function ToDo() {
  CompletedButton.style.backgroundColor = "rgb(83, 178, 212)";
  ToDoButton.style.backgroundColor = "rgb(217,217,217)";
  ToDoTable.removeAttribute("hidden");
  CompletedTable.setAttribute("hidden", "hidden");
  ToDoTable.style.display = "table";
  CompletedTable.style.display = "none";
}

function completed() {
  CompletedButton.style.backgroundColor = "rgb(217,217,217)";
  ToDoButton.style.backgroundColor = "rgb(83, 178, 212)";
  CompletedTable.removeAttribute("hidden");
  ToDoTable.setAttribute("hidden", "hidden");
  ToDoTable.style.display = "none";
  CompletedTable.style.display = "table";
}

function moveRow(button) {
  var row = button.closest(".block");
  //   var table = row.closest("div").id;
  var clone = row.cloneNode(true);
  row.style.animation = "fadeOut 0.5s";
  setTimeout(function () {
    row.remove();
  }, 500);
  clone.querySelector("button").setAttribute("onclick", "moveRow2(this)");
  clone.querySelector("button").classList.remove("left");
  clone.querySelector("button").classList.add("left2");
  document.getElementById("completed-table").appendChild(clone);

  row.remove();
}

function moveRow2(button) {
  var row = button.closest(".block");
  //   var table = row.closest("div").id;
  var clone = row.cloneNode(true);
  row.style.animation = "fadeOut 0.5s";
  setTimeout(function () {
    row.remove();
  }, 500);
  clone.querySelector("button").setAttribute("onclick", "moveRow(this)");
  clone.querySelector("button").classList.remove("left2");
  clone.querySelector("button").classList.add("left");
  document.getElementById("to-do-table").appendChild(clone);

  row.remove();
}
