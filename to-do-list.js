const inputDisplay = document.getElementById('inputBox');
const listContainer = document.getElementById('listContainer');

function addTask() {
    if(inputDisplay.value === "") {
        alert('you must write a task')
    } else {

        let li = document.createElement("li");
        li.innerHTML = inputDisplay.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.className = "closeTask"
        span.innerHTML = "\u2715";
        li.appendChild(span);
        li.style.display = "block";

       
    }

    inputDisplay.value = "";

    saveData();
}
listContainer.addEventListener('click', function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } 
      else if (e.target.tagName === "SPAN") {
        const confirmation = confirm("Are you sure you want to remove this task?");
        if (confirmation) {
            e.target.parentElement.remove();
            saveData();
        }
        }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showData () {
    listContainer.innerHTML = localStorage.getItem("data");
}

showData();