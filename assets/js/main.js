const toDo = document.getElementById("toDo");
const taskInput = document.getElementById("task");
const list = document.getElementById("list");
const addBtn = document.getElementById("addBtn");
const editBtn = document.getElementById("editBtn");

let tasks = [];
let id;

function initApp(){
    getTasksFromLocalStorage();
    displayTasks()
}

function getTasksFromLocalStorage() {
    if (localStorage.getItem("tasks")) {
        tasks = JSON.parse(localStorage.getItem("tasks"))
    } else {
        localStorage.setItem("tasks", []);
    }
}

function setTasksToLocalStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
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

function deleteTask(task) {
    tasks.splice(task, 1), setTasksToLocalStorage(tasks), displayTasks();
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


if ("undefined" !== typeof Storage) {
    console.log("LocalStorage is supported.");
    initApp()
} else {
    toDo.innerHTML =
        '<h1 class="bg-danger py-2 text-center my-5">LocalStorage is not supported in this browser.</h1>';
}

addBtn.addEventListener("click", function () {
    let title = taskInput.value;
    if (!checkIfUnique(title).length) {
        let task = {
            'title': title,
            'slug': generateSlug(title),
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
    return tasks.filter((task) => { return task.title === title });
}

function generateSlug(title) {
    let slug = title.toLowerCase().replace(/[-+_=]/g, '').replace(/ /g, '-');
    return slug;
}



function editTask(index) {
    id = index
    taskInput.value = tasks[id].title
    removeBtnAdd()
    displayBtnEdit()
}

function updateTask(index, title) {
    tasks[index].title = title
    tasks[index].slug = generateSlug(title)
    removeBtnEdit()
    displayBtnAdd()
    clearTaskInput()
    setTasksToLocalStorage(tasks)
    displayTasks()
}

editBtn.addEventListener("click", function () {
    if (!checkIfUnique(taskInput.value).length) {
        updateTask(id, taskInput.value);
    } else {
        showError()
    }
});


function showError() {
    alert("the title should be unique")
}
