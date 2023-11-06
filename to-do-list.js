const inputField = document.getElementById('inputField');
const listContainer = document.getElementById('listContainer');
let editMode = false;
let taskToEdit = null;


//function for adding tasks and updating edited tasks
function addTask() {
    if (inputField.value === "") {
        alert('You must write a task');
    } else {
        if (editMode) {
            taskToEdit.firstChild.textContent = inputField.value; // Update the text content of the first child (the text node) of the <li>
            editMode = false;
            taskToEdit = null;
        } else {
            let li = document.createElement("li");
            li.innerHTML = inputField.value;
            listContainer.appendChild(li);
            let span0 = document.createElement("span");
            span0.className = "edit";
            span0.innerHTML = "\u270F";
            li.appendChild(span0);
            let span = document.createElement("span");
            span.className = "closeTask";
            span.innerHTML = "\u2715";
            li.appendChild(span);
            li.style.display = "block";
        }
    }

    inputField.value = "";
    saveData();
}

listContainer.addEventListener('click', function (e) {
    if (e.target.tagName === "LI") {
        if (!editMode) {
            e.target.classList.toggle("checked");
            saveData();
        }
    } else if (e.target.className === "closeTask") {
        const confirmation = confirm("Are you sure you want to remove this task?");
        if (confirmation) {
            e.target.parentElement.remove();
            saveData();
        }
    } else if (e.target.className === "edit") {
        editMode = true;
        taskToEdit = e.target.parentElement;
        inputField.value = taskToEdit.firstChild.textContent; // Set the input field value to the text content of the <li>
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showData() {
    listContainer.innerHTML = localStorage.getItem("data");
}

showData();