const todoList = [
    {
        id: 1,
        todoText: "Get Groceries",
        status: "To-Do",
        statusCode: 1,
    },
    {
        id: 2,
        todoText: "Complete Task",
        status: "Completed",
        statusCode: 3,
    },
    {
        id: 3,
        todoText: "Write Notes",
        status: "In-Progress",
        statusCode: 2,
    }
    
];

function compare( a, b ) {
    if ( a.statusCode < b.statusCode){
      return -1;
    }
    return 0;
}
  
const todoListElement = document.querySelector("#todo-table");

document.querySelector("#add-task").addEventListener("click", addTodo);
displayTodos();

function addTodo (){
    const todoText = document.querySelector("#input-name").value;

    if (todoText == "") {

        alert("You did not enter any item");

    } else {
        const todoObject = {
            id: todoList.length+1,
            todoText: todoText,
            status: "To-Do",
        };

        todoList.push(todoObject);
        todoList.sort();
        console.log(todoList);
        displayTodos();
    }
}

function editTodo () {
    const editBtns = document.querySelectorAll(".edit");
    const editForm = document.querySelector("#overlay");
    const editInput = document.querySelector("#edit-input");
    const editTask = document.querySelector("#edit-task");
    const editStatus = document.querySelector("#edit-status");
    

    editBtns.forEach(async (element) => {
        element.addEventListener("click", () => {
            const dataId = element.getAttribute('data-id');
            const elementIndex =  todoList.findIndex((item) => item.id == dataId);
            var obj = todoList[elementIndex];

            editForm.classList.remove("hidden");
            console.log(dataId);

            editInput.setAttribute("placeholder", obj.todoText);
            console.log(editStatus);

            editTask.addEventListener("click", () => {
                console.log(elementIndex);
                if(editInput.value !== ""){
                    todoList[elementIndex].todoText = editInput.value;
                }

                if(editStatus.value !== ""){
                    todoList[elementIndex].status = editStatus.value;
                }
 
                editForm.classList.add("hidden");
                displayTodos();
            });         
        })
    })
}

function deleteTodo() {
    const deleteBtns = document.querySelectorAll(".delete");
    deleteBtns.forEach((element) => {
        element.addEventListener("click", () => {
            const dataId = element.getAttribute('data-id');
            console.log(dataId);
            todoList.splice(todoList.findIndex((item) => item.id == dataId), 1);
            displayTodos();
        })
    })
}

function displayTodos() {
    todoListElement.innerHTML = "";
    document.querySelector("#input-name").value = "";
    
    todoList.forEach((item) => {
        const listElement = document.createElement("tr");
        listElement.setAttribute("data-id", item.id);
        listElement.classList.add("border-b", "bg-slate-100");

        // Task
        const taskName = document.createElement("td");
        taskName.innerHTML = item.todoText;
        taskName.classList.add("text-lg", "text-gray-900","font-light", "px-6", "py-4", "whitespace-nowrap", "text-center",);


        const taskStatus = document.createElement("td");
        const taskField = document.createElement("span");
        taskField.innerHTML = item.status;
        taskStatus.classList.add("text-center");
        taskField.classList.add("text-lg", "text-gray-900","font-light", "px-6", "py-4", "whitespace-nowrap", "border-2", "rounded-2xl");
        if(item.status === "To-Do"){
            taskField.classList.add("text-red-500", "border-red-500");
        }else if(item.status === "Completed"){
            taskField.classList.add("text-sky-500", "border-sky-500");
        }else{
            taskField.classList.add("text-yellow-500", "border-yellow-500");
        }
        taskStatus.append(taskField);
   
        // Actions
        const actionTask = document.createElement("td");

        const editButton = document.createElement("i");
        editButton.classList.add("fa-solid", "fa-pen-to-square", "px-6", "py-4", "border", "border-sky-500",  "text-sky-500", "cursor-pointer", "rounded-lg", "edit", "h-14");
        const deleteButton = document.createElement("i");
        deleteButton.classList.add("fa-solid", "fa-trash", "px-6", "py-4", "border", "border-slate-500", "cursor-pointer", "rounded-lg", "delete", "h-14");

        actionTask.classList.add("flex", "flex-wrap", "gap-4", "justify-center", "items-center", "h-auto","font-light", "whitespace-nowrap", "text-center", "text-xl");

        actionTask.appendChild(editButton);
        actionTask.appendChild(deleteButton);

        deleteButton.setAttribute("data-id", item.id);
        editButton.setAttribute("data-id", item.id);

        listElement.appendChild(taskName);
        listElement.appendChild(taskStatus);
        listElement.appendChild(actionTask);

        todoListElement.append(listElement);
    })
    
    editTodo();
    deleteTodo();
}




