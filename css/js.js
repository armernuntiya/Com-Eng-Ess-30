var ToDoButton = document.getElementsByClassName("todo");
var CompletedButton = document.getElementsByClassName("completed");
document.getElementsByClassName("todo").addEventListener("click", ToDo);
document.getElementsByClassName("completed").addEventListener("click",completed);
function ToDo() {
    ToDoButton.style.backgroundColor = "rgb(83, 178, 212)"; 
    CompletedButton.style.backgroundColor = "rgb(217,217,217)"
}

function completed() {
    ToDoButton.style.backgroundColor = "rgb(217,217,217)"; 
    CompletedButton.style.backgroundColor = "rgb(83, 178, 212)"
}