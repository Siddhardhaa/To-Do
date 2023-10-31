document.addEventListener("DOMContentLoaded", function () {
    const addButton = document.getElementById("add");
    const taskInput = document.getElementById("task");
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskList = document.getElementById("task-list");

    function addTaskToList(taskText) {
        const li = document.createElement("li");
        li.innerHTML = `<span><strong>${taskText}</strong></span> <button class='delete'>Delete</button`;
        taskList.appendChild(li);

        const deleteButton = li.querySelector(".delete");
        deleteButton.addEventListener("click", function () {
            taskList.removeChild(li);
            saveToLocalStorage();
        });
    }

    storedTasks.forEach(function (taskText) {
        addTaskToList(taskText);
    });

    addButton.addEventListener("click", function () {
        taskInput.style.display = "block";
        const submitButton = document.getElementById("sub");

        submitButton.addEventListener("click", function () {
            const taskText = taskInput.value.trim();
            if (taskText !== "") {
                addTaskToList(taskText);
                saveToLocalStorage();
                taskInput.value = '';
            }
        });
    });
});

function saveToLocalStorage() {
    const taskList = document.getElementById("task-list");
    const tasks = [];
    taskList.querySelectorAll('li').forEach(function (li) {
        const span = li.querySelector("span");
        tasks.push(span.textContent);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}