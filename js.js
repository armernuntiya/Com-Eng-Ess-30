var ToDoButton = document.querySelector(".todo");
var CompletedButton = document.querySelector(".completed");
var ToDoTable = document.getElementById("to-do-table");
var CompletedTable = document.getElementById("completed-table");

CompletedTable.setAttribute("hidden","hidden");
CompletedTable.style.display = "none";

function ToDo() {
    CompletedButton.style.backgroundColor = "rgb(83, 178, 212)"; 
    ToDoButton.style.backgroundColor = "rgb(217,217,217)";
    ToDoTable.removeAttribute("hidden");
    CompletedTable.setAttribute("hidden","hidden");
    ToDoTable.style.display = "table";
    CompletedTable.style.display = "none";
}

function completed() {
    CompletedButton.style.backgroundColor = "rgb(217,217,217)"; 
    ToDoButton.style.backgroundColor = "rgb(83, 178, 212)";
    CompletedTable.removeAttribute("hidden");
    ToDoTable.setAttribute("hidden","hidden");
    ToDoTable.style.display = "none";
    CompletedTable.style.display = "table";
}