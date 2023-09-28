let toDo = document.getElementById('toDo');
let taskInput = document.getElementById('task');
let list = document.getElementById('list');
let addBtn = document.getElementById('addBtn');
let editBtn = document.getElementById('editBtn')

let tasks = [];

//to get all tasks from local storage
function getTasksFromLocalStorage() {
    if (localStorage.getItem('tasks')) {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    } else {
        localStorage.setItem('tasks', tasks)
        tasks = []
    }
}

//to get all tasks from local storage
function setTasksToLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function displayTasks() {
    let data = ``;
    for (let i = 0; i < tasks.length; i++) {
        data += `
        <ul class="list-group list-group-horizontal rounded-0 bg-transparent">
                                    <li
                                        class="list-group-item d-flex align-items-center ps-0 pe-3 py-1 rounded-0 border-0 bg-transparent">
                                        <div class="form-check">
                                            <input class="form-check-input me-0" type="checkbox" value=""
                                                id="flexCheckChecked1" aria-label="..."  />
                                        </div>
                                    </li>
                                    <li
                                        class="list-group-item px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent">
                                        <p class="lead fw-normal mb-0"> ${tasks[i]}</p>
                                    </li>
                                    <li class="list-group-item ps-3 pe-0 py-1 rounded-0 border-0 bg-transparent">
                                        <div class="d-flex flex-row justify-content-end mb-1">
                                            <a href="#!" class="text-info" data-mdb-toggle="tooltip" title="Edit todo" onclick="editTask(${i})"><i
                                                    class="fas fa-pencil-alt me-3"></i></a>
                                            <a href="#!" class="text-danger" data-mdb-toggle="tooltip"
                                                title="Delete todo" onclick="deleteTask(${i})"><i class="fas fa-trash-alt"></i></a>
                                        </div>
                                    </li>
                                </ul>
        `;
    }
    list.innerHTML = data;
}

//first get tasks
getTasksFromLocalStorage()

//second display it in documnet
displayTasks()

if (typeof (Storage) !== "undefined") {
    // Web Storage API is supported
    console.log("LocalStorage is supported.");

} else {
    // Web Storage API is not supported
    toDo.innerHTML = `<h1 class="bg-danger py-2 text-center my-5">LocalStorage is not supported in this browser.</h1>`
}

//get data from input when click btn add
addBtn.addEventListener('click', function () {
    let task = taskInput.value;
    tasks.push(task)
    clearTaskInput()
    setTasksToLocalStorage(tasks);
    displayTasks()
});

//clear all data in input
function clearTaskInput() {
    taskInput.value = '';
}


//delete task by id
function deleteTask(id) {
    tasks.splice(id, 1);
    setTasksToLocalStorage(tasks)
    displayTasks()
}

function removeBtnEdit() {
    editBtn.classList.add('d-none');
}

function removeBtnAdd() {
    addBtn.classList.add('d-none');
}


function displayBtnEdit() {
    editBtn.classList.remove('d-none');
}

function displayBtnAdd() {
    addBtn.classList.remove('d-none');
}

let id 
// make it global 

//edit task by id
function editTask(i) {
    id = i;
    taskInput.value = tasks[id];
    removeBtnAdd()
    displayBtnEdit()
}

editBtn.addEventListener('click', function () {
    updateTask(id,taskInput.value)
})


function updateTask(id, newTask) {
    tasks[id] = newTask;

    removeBtnEdit()
    displayBtnAdd()
    clearTaskInput()
    setTasksToLocalStorage(tasks)
    displayTasks()
}
