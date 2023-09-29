let toDo = document.getElementById("toDo");
let taskInput = document.getElementById("task");
let list = document.getElementById("list");
let addBtn = document.getElementById("addBtn");
let editBtn = document.getElementById("editBtn");
let tasks = [];

function getTasksFromLocalStorage() {
    if (localStorage.getItem("tasks")) {
        tasks = JSON.parse(localStorage.getItem("tasks"))
    } else {
        localStorage.setItem("tasks", []);
    }
}

function setTasksToLocalStorage(t) {
    localStorage.setItem("tasks", JSON.stringify(t));
}

function displayTasks() {
    let data = "";
    for (let i = 0; i < tasks.length; i++)
        data += `
        <div class="item col-3  my-2  d-flex flex-column justify-content-center align-items-center">
        <h2 class="mb-3">${tasks[i].title}</h2>
        <div class="d-flex flex-row justify-content-end mb-1">
            <a href="#" class="text-primary" data-mdb-toggle="tooltip" title="Edit todo" onclick="editTask(${i})"><i
                    class="fas fa-pencil-alt me-3"></i></a>
            <a href="#" class="text-danger" data-mdb-toggle="tooltip"
                title="Delete todo" onclick="deleteTask(${i})"><i class="fas fa-trash-alt"></i></a>
        </div>
    </div>
        `;
    list.innerHTML = data;
}

function clearTaskInput() {
    taskInput.value = "";
}

function deleteTask(t) {
    tasks.splice(t, 1), setTasksToLocalStorage(tasks), displayTasks();
}

function removeBtnEdit() {
    editBtn.classList.add("d-none");
}

function removeBtnAdd() {
    addBtn.classList.add("d-none");
}

function displayBtnEdit() {
    editBtn.classList.remove("d-none");
}

function displayBtnAdd() {
    addBtn.classList.remove("d-none");
}

getTasksFromLocalStorage();
displayTasks()

if ("undefined" != typeof Storage) {
    console.log("LocalStorage is supported.");
} else {
    toDo.innerHTML =
        '<h1 class="bg-danger py-2 text-center my-5">LocalStorage is not supported in this browser.</h1>';
}

addBtn.addEventListener("click", function () {
    let title = taskInput.value;
    if (!checkIfUnique(title).length) {
        let task = {
            'title': title,
            'slug': generateSlug(title)
        }
        tasks.push(task),
            clearTaskInput(),
            setTasksToLocalStorage(tasks),
            displayTasks();
    } else {
        showError();
    }
});

function checkIfUnique(title) {
    return tasks.filter((e) => { return e.title == title });
}

function generateSlug(title) {
    let slug = title.toLowerCase().replace(/[-+_=]/g, '').replace(/ /g, '-');
    return slug;
}

let id;

function editTask(t) {
    (id = t), (taskInput.value = tasks[id]), removeBtnAdd(), displayBtnEdit();
}

function updateTask(t, e) {
    (tasks[t] = e),
        removeBtnEdit(),
        displayBtnAdd(),
        clearTaskInput(),
        setTasksToLocalStorage(tasks),
        displayTasks();
}

editBtn.addEventListener("click", function () {
    updateTask(id, taskInput.value);
});


function showError() {
    alert("the name should be unique")
}