const inputField = document.getElementById('inputField');
const listContainer = document.getElementById('listContainer');

//function for adding tasks and updating edited tasks
function addTask() {
    if (inputField.value === "") {
        alert('You must write a task');
    } else {
            let li = document.createElement("li");
            li.innerHTML = inputField.value;
            listContainer.appendChild(li);
            let span0 = document.createElement("span"); //first span on the LI
            span0.className = "edit";
            span0.innerHTML = "\u270F";
            li.appendChild(span0);
            let span = document.createElement("span"); //second span on the LI
            span.className = "closeTask";
            span.innerHTML = "\u2715";
            li.appendChild(span);
            li.style.display = "block";
        }

    inputField.value = ""; //set inputField to empty afte each time an li is created
    saveData();
}

//event listener for "keyup" on inputField for the "enter" key
inputField.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

listContainer.addEventListener('click', function (e) {
    if (e.target.tagName === "LI") {
            e.target.classList.toggle("checked");
            saveData();
    } else if (e.target.className === "closeTask") {
        const confirmation = confirm("Are you sure you want to remove this task?");
        if (confirmation) {
            e.target.parentElement.remove();
            saveData();
        }
    } else if (e.target.className === "edit") {
        let save = document.getElementById('editSave');
        let taskToedit = e.target.parentElement;
        let editField = document.getElementById('editField');
        let editTask = document.getElementById('editTask');
        editTask.style.display = "block";
        editField.value = taskToedit.firstChild.textContent;
        save.addEventListener('click', function () {
            taskToedit.firstChild.textContent = editField.value;
            editField.focus();
            editTask.style.display = "none";
            saveData();
        })
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showData() {
    listContainer.innerHTML = localStorage.getItem("data");
}

showData();

