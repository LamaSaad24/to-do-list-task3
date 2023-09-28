let toDo=document.getElementById("toDo"),taskInput=document.getElementById("task"),list=document.getElementById("list"),addBtn=document.getElementById("addBtn"),editBtn=document.getElementById("editBtn"),tasks=[];function getTasksFromLocalStorage(){tasks=localStorage.getItem("tasks")?JSON.parse(localStorage.getItem("tasks")):(localStorage.setItem("tasks",tasks),[])}function setTasksToLocalStorage(t){localStorage.setItem("tasks",JSON.stringify(t))}function displayTasks(){let e="";for(let t=0;t<tasks.length;t++)e+=`
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
                                        <p class="lead fw-normal mb-0"> ${tasks[t]}</p>
                                    </li>
                                    <li class="list-group-item ps-3 pe-0 py-1 rounded-0 border-0 bg-transparent">
                                        <div class="d-flex flex-row justify-content-end mb-1">
                                            <a href="#!" class="text-info" data-mdb-toggle="tooltip" title="Edit todo" onclick="editTask(${t})"><i
                                                    class="fas fa-pencil-alt me-3"></i></a>
                                            <a href="#!" class="text-danger" data-mdb-toggle="tooltip"
                                                title="Delete todo" onclick="deleteTask(${t})"><i class="fas fa-trash-alt"></i></a>
                                        </div>
                                    </li>
                                </ul>
        `;list.innerHTML=e}function clearTaskInput(){taskInput.value=""}function deleteTask(t){tasks.splice(t,1),setTasksToLocalStorage(tasks),displayTasks()}function removeBtnEdit(){editBtn.classList.add("d-none")}function removeBtnAdd(){addBtn.classList.add("d-none")}function displayBtnEdit(){editBtn.classList.remove("d-none")}function displayBtnAdd(){addBtn.classList.remove("d-none")}getTasksFromLocalStorage(),displayTasks(),"undefined"!=typeof Storage?console.log("LocalStorage is supported."):toDo.innerHTML='<h1 class="bg-danger py-2 text-center my-5">LocalStorage is not supported in this browser.</h1>',addBtn.addEventListener("click",function(){var t=taskInput.value;tasks.push(t),clearTaskInput(),setTasksToLocalStorage(tasks),displayTasks()});let id;function editTask(t){id=t,taskInput.value=tasks[id],removeBtnAdd(),displayBtnEdit()}function updateTask(t,e){tasks[t]=e,removeBtnEdit(),displayBtnAdd(),clearTaskInput(),setTasksToLocalStorage(tasks),displayTasks()}editBtn.addEventListener("click",function(){updateTask(id,taskInput.value)});