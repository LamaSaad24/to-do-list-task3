let toDo=document.getElementById("toDo"),taskInput=document.getElementById("task"),list=document.getElementById("list"),addBtn=document.getElementById("addBtn"),editBtn=document.getElementById("editBtn"),tasks=[];function getTasksFromLocalStorage(){localStorage.getItem("tasks")?tasks=JSON.parse(localStorage.getItem("tasks")):localStorage.setItem("tasks",[])}function setTasksToLocalStorage(t){localStorage.setItem("tasks",JSON.stringify(t))}function displayTasks(){let e="";for(let t=0;t<tasks.length;t++)e+=`
        <div class="item col-3  my-2  d-flex flex-column justify-content-center align-items-center">
        <h2 class="mb-3">${tasks[t].title}</h2>
        <div class="d-flex flex-row justify-content-end mb-1">
            <a href="#" class="text-primary" data-mdb-toggle="tooltip" title="Edit todo" onclick="editTask(${t})"><i
                    class="fas fa-pencil-alt me-3"></i></a>
            <a href="#" class="text-danger" data-mdb-toggle="tooltip"
                title="Delete todo" onclick="deleteTask(${t})"><i class="fas fa-trash-alt"></i></a>
        </div>
    </div>
        `;list.innerHTML=e}function clearTaskInput(){taskInput.value=""}function deleteTask(t){tasks.splice(t,1),setTasksToLocalStorage(tasks),displayTasks()}function removeBtnEdit(){editBtn.classList.add("d-none")}function removeBtnAdd(){addBtn.classList.add("d-none")}function displayBtnEdit(){editBtn.classList.remove("d-none")}function displayBtnAdd(){addBtn.classList.remove("d-none")}function checkIfUnique(e){return tasks.filter(t=>t.title==e)}function generateSlug(t){return t.toLowerCase().replace(/[-+_=]/g,"").replace(/ /g,"-")}getTasksFromLocalStorage(),displayTasks(),"undefined"!=typeof Storage?console.log("LocalStorage is supported."):toDo.innerHTML='<h1 class="bg-danger py-2 text-center my-5">LocalStorage is not supported in this browser.</h1>',addBtn.addEventListener("click",function(){var t=taskInput.value;(checkIfUnique(t)?showError:(t={title:t,slug:generateSlug(t)},tasks.push(t),clearTaskInput(),setTasksToLocalStorage(tasks),displayTasks))()});let id;function editTask(t){id=t,taskInput.value=tasks[id],removeBtnAdd(),displayBtnEdit()}function updateTask(t,e){tasks[t]=e,removeBtnEdit(),displayBtnAdd(),clearTaskInput(),setTasksToLocalStorage(tasks),displayTasks()}function showError(){alert("the name should be unique")}editBtn.addEventListener("click",function(){updateTask(id,taskInput.value)});