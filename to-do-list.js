const inputField = document.getElementById('inputField');
const listContainer = document.getElementById('listContainer');
let touchStartX;

function addTask() {
    if (inputField.value === "") {
        alert('You must write a task');
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputField.value;

        // Add touchstart event for swipe-to-delete
        li.addEventListener('touchstart', handleTouchStart, false);

        // Your existing code for adding spans and styling
        let span0 = document.createElement("span");
        span0.className = "edit";
        span0.innerHTML = "\u270F";
        li.appendChild(span0);

        let span = document.createElement("span");
        span.className = "closeTask";
        span.innerHTML = "\u2715";
        li.appendChild(span);

        listContainer.appendChild(li);
        li.style.display = "block";
    }

    inputField.value = "";
    saveData();
}

function handleTouchStart(event) {
    touchStartX = event.changedTouches[0].screenX;
    event.target.addEventListener('touchend', handleTouchEnd, false);
}

function handleTouchEnd(event) {
    const touchEndX = event.changedTouches[0].screenX;
    const deltaX = touchEndX - touchStartX;

    const swipeThreshold = 50;

    if (deltaX < -swipeThreshold) {
        const confirmation = confirm("Are you sure you want to remove this task?");
        if (confirmation) {
            event.target.parentElement.remove();
            saveData();
        }
    }

    event.target.removeEventListener('touchend', handleTouchEnd, false);
}

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
        // Your existing code for edit functionality
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showData() {
    listContainer.innerHTML = localStorage.getItem("data");
}

showData();