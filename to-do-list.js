let taskField = document.getElementById('taskField');
let btn = document.getElementById('btn');
let taskContainer = document.getElementById('taskContainer');
let taskList = document.getElementById('taskList');

//setting taskToEdit, editBackground,editField and editImageDiv global
let taskToEdit;
let editBackground;
let editImageDiv;
let editField;

//function for creating task content: parameter "taskText" will be replaced by "taskField.value" in the add task function
function createTaskContent(taskText) {
    let taskContent = document.createElement('div');
    taskContent.classList.add('col-12', 'col-md-10', 'mt-3', 'taskContent');
    taskContent.id = "taskContent";
    taskContent.innerHTML = taskText;

    return taskContent;
}

//function for creating edit button
function createEditButton() {
    let editImage = document.createElement('img');
    editImage.className = "editImage";
    editImage.src = "edit.png";

    //appending the created edit image to the created edit div 
    let edit = document.createElement('div');
    edit.classList.add('col-1', 'col-md-1', 'mt-3', 'editTask');
    edit.appendChild(editImage);

    return edit;
}

//function for creating close button
function createCloseButton() {
    let closeImage = document.createElement('img');
    closeImage.className = "closeImage";
    closeImage.src = "closeTask.png";

    let closeTask = document.createElement('div');
    closeTask.classList.add('col-1', 'col-md-1', 'mt-3', 'closeTask');
    closeTask.appendChild(closeImage);

    return closeTask;
}

//function for adding task content to the task container: the taskContent, editTask and closeTask
function addTask() {
    if (taskField.value === "") {
        alert('Task Field is Empty')
    } else {
        let taskContent = createTaskContent(taskField.value);
        let editButton = createEditButton();
        let closeButton = createCloseButton();

        // Attach touch event listener for swipe right
        taskContent.addEventListener('touchstart', handleSwipeStart);
        taskContent.addEventListener('touchend', handleSwipeEnd);



        taskList.appendChild(taskContent);
        taskList.appendChild(editButton);
        taskList.appendChild(closeButton);
        taskContainer.appendChild(taskList);

        taskField.focus();
    }

    taskField.value = "";
}

// Function to handle touch start
function handleSwipeStart(e) {
    // Record the starting position of the touch
    startX = e.changedTouches[0].clientX;
}

// Function to handle touch end
function handleSwipeEnd(e) {
    // Calculate the distance moved
    let distance = e.changedTouches[0].clientX - startX;

    // Check if the distance moved is sufficient for a swipe
    if (distance > 50) {
        // Swipe right detected, call the handleCloseTaskClick function
        handleCloseTaskClick(e);
    }
}


//function for closing task
function handleTaskContentClick(e) {
    if (e.target.classList.contains("taskContent")) {
        e.target.classList.toggle("taskComplete");
    }
}

//function for editing task
function handleEditImageClick(e) {
    if (e.target.className === "editImage") {

        //accessing the edit field
        editField = document.getElementById('editField');

        //accessing the EditImage div
        editImageDiv = e.target.parentElement;

        //accessing the previous sibling, which is taskContent
        taskToEdit = editImageDiv.previousElementSibling;

        //updating the value of edit field with the innerHTMl of taskContent
        editField.value = taskToEdit.innerHTML;

        //accessing the edit background which is a container for the edit field
        editBackground = document.getElementById('editBackground');

        //removing the class "hidden" from edit background classes to unhide it
        editBackground.classList.remove('hidden');
         
       
    }
}


function handleCloseTaskClick(e) {
    if (e.target.className === "closeImage") {
        const confirmation = confirm("Remove this task ?");
        if (confirmation) {
            //accessing the close image div
        const closeImageDiv = e.target.parentElement.parentElement;

        closeImageDiv.parentElement.remove();
        }

    }
}

// Set up event listeners
taskContainer.addEventListener('click', handleTaskContentClick);
taskContainer.addEventListener('click', handleEditImageClick);
taskContainer.addEventListener('click', handleCloseTaskClick);

let saveEdit = document.getElementById('editSave');

saveEdit.addEventListener('click', function() {

    //access the edit field

    //update the innerHTML of taskContent with edit field
    taskToEdit.innerHTML = editField.value;

    //hide back edit backgroun
    editBackground.classList.add('hidden');
})

//event listener for "keyup" on inputField for the "enter" key
taskField.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

