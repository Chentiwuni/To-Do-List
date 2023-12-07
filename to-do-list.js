let taskField = document.getElementById('taskField');
let taskAmount = document.getElementById('amountField');
let btn = document.getElementById('btn');
let taskContainer = document.getElementById('taskContainer');

//function for adding tasks
function addTask() {
    if (taskField.value === "") {
        alert ('Task field is empty');
    } else {
        let taskItem = document.createElement("LI");
        taskItem.className = "taskItems";

        let taskContent = document.createElement("span");
        taskContent.className = "taskContent";
        taskContent.innerHTML = taskField.value;

        let taskDecoration = document.createElement("span");
        taskDecoration.className = "taskDecoration";

        let amountDisplay = document.createElement("div");
        amountDisplay.className = "amountDisplay";
        amountDisplay.innerHTML = taskAmount.value;

        let editTask = document.createElement("img");
        editTask.className = "edit";
        editTask.src = "edit.png";

        let closeTask = document.createElement("img");
        closeTask.className = "closeTask";
        closeTask.src = "closeTask.png";

        taskItem.appendChild(taskContent);
        taskItem.appendChild(amountDisplay);
        taskItem.appendChild(editTask);
        taskItem.appendChild(closeTask);

        taskContainer.appendChild(taskItem);


        taskItem.style.display = "inline-block";

    }

    taskField.value = "";
    taskAmount.value = "";

}

taskContainer.addEventListener('click', function(e){
    if (e.target.tagName === "LI" || e.target.tagName === "SPAN") {
        e.target.classList.toggle("checked");
        e.target.classList.toggle("taskDecoration");
    }

    else if (e.target.className === "closeTask") {
        const confirmation = confirm("Are you sure you want to remove this task ?");
        if (confirmation) {
            e.target.parentElement.remove();
        }
    }
})
