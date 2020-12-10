function addTaskEnabled() {
    var addTaskInput = document.getElementById("addTaskInput");
    var addBtn = document.getElementById("addBtn");
    
    if(addTaskInput.value == "")
        addBtn.disabled = true;
    else
        addBtn.disabled = false;
}

var tasks = [];

var taskCounter = 0;

function renderTasks() {

    var taskTrackerCont = document.getElementById("taskTrackerCont");
    var addTaskInput = document.getElementById("addTaskInput");
    
    var taskOuterCont = document.createElement("div");
    var removeBtn = document.createElement("button");
    var removeIcon = document.createElement("img");
    var taskCont = document.createElement("div");
    var taskNameDiv = document.createElement("div");
    var taskName = document.createElement("input");
    var time = document.createElement("h4");
    var taskBtns = document.createElement("div");
    var startBtn = document.createElement("button");
    var endBtn = document.createElement("button");

    time.className = "time";
    taskOuterCont.className = "task";
    taskCont.className = "row taskCont";
    taskNameDiv.className = "col-9 taskNameDiv";
    taskName.className = "taskName";
    taskBtns.className = "col-3 taskBtns";
    startBtn.className = "btn start";
    endBtn.className = "btn end";
    removeBtn.className = "btn removeBtn";

    taskOuterCont.id = "task"+taskCounter;
    taskNameDiv.id = "taskNameDiv"+taskCounter;
    time.id = "time"+taskCounter;
    

    removeIcon.src = "/icons/x-circle.svg"

    /* time.innerHTML = ""; */
    startBtn.innerHTML = "start";
    endBtn.innerHTML = "end";
    endBtn.disabled = true;

    startBtn.setAttribute("onclick", "start(this.parentElement.parentElement.parentElement.id);");
    endBtn.setAttribute("onclick", "end(this.parentElement.parentElement.parentElement.id);");
    removeBtn.setAttribute("onclick", "removeTask(this.parentElement);")
    taskName.setAttribute("onchange", "autosave(this);")

    startBtn.id = "start"+taskCounter;
    endBtn.id = "end"+taskCounter;

    taskName.value = tasks[taskCounter].taskName;

    removeBtn.appendChild(removeIcon);

    taskNameDiv.appendChild(taskName);
    taskNameDiv.appendChild(time);
    taskBtns.appendChild(startBtn);
    taskBtns.appendChild(endBtn);

    taskCont.appendChild(taskNameDiv);
    taskCont.appendChild(taskBtns);

    taskOuterCont.appendChild(taskCont);
    taskOuterCont.appendChild(removeBtn);

    taskTrackerCont.appendChild(taskOuterCont);

    addTaskInput.value = "";
    taskCounter++;
}

function addTask() {

    var addTaskInput = document.getElementById("addTaskInput");
    var addBtn = document.getElementById("addBtn");
    var today = new Date();
    var hrs = ("0" + today.getHours()).slice(-2);
    var mins = ("0" + today.getMinutes()).slice(-2);
    var secs = ("0" + today.getSeconds()).slice(-2);

    var timeAdded = hrs+mins+secs;

    tasks.push(
        {
            taskName: addTaskInput.value,
            addTime: timeAdded

        }
    );
    


    renderTasks();

}

function removeTask(task) {
    var index = task.id[task.id.length-1];

    tasks.splice(index, 1);
    task.remove();

    console.log(tasks);

}

function start(taskID) {
    var today = new Date();
    var hrs = ("0" + today.getHours()).slice(-2);
    var mins = ("0" + today.getMinutes()).slice(-2);
    var secs = ("0" + today.getSeconds()).slice(-2);


    var startTime = hrs+mins+secs;
    var index = taskID[taskID.length-1];
    var startBtn = document.getElementById("start"+index);
    var endBtn = document.getElementById("end"+index);
    var showTime = document.getElementById("time")

    tasks[index].timeStarted = startTime;
    
    startBtn.disabled = true;
    endBtn.disabled = false;

    console.log(startTime);

}

function end(taskID) {
    var today = new Date();
    var hrs = ("0" + today.getHours()).slice(-2);
    var mins = ("0" + today.getMinutes()).slice(-2);
    var secs = ("0" + today.getSeconds()).slice(-2);

    var endTime = hrs+mins+secs;
    var index = taskID[taskID.length-1];
    var endBtn = document.getElementById("end"+index);
    var timeStart = tasks[index].timeStarted;
    var duration = endTime - timeStart;
    var showTime = document.getElementById("time"+index);


    var convertMin = Math.floor(duration / 60);
    var convertSec = duration - (convertMin * 60);


    showTime.innerHTML = `Duration: ${convertMin}mins ${convertSec}sec`;
    

    tasks[index].timeEnded = endTime;
    tasks[index].duration = duration;

    endBtn.disabled = true;



    console.log(tasks);
}


function autosave(taskName) {
    taskName.value = taskName.value;
    var taskNameDiv = document.getElementById(taskName.parentElement.id);
    var index = taskNameDiv.id[taskNameDiv.id.length-1];

    tasks[index].taskName = taskName.value;



}

function renderTasksSort(i){
    var taskTrackerCont = document.getElementById("taskTrackerCont");

    var taskOuterCont = document.createElement("div");
    var removeBtn = document.createElement("button");
    var removeIcon = document.createElement("img");
    var taskCont = document.createElement("div");
    var taskNameDiv = document.createElement("div");
    var taskName = document.createElement("input");
    var time = document.createElement("h4");
    var taskBtns = document.createElement("div");
    var startBtn = document.createElement("button");
    var endBtn = document.createElement("button");

    time.className = "time";
    taskOuterCont.className = "task";
    taskCont.className = "row taskCont";
    taskNameDiv.className = "col-9 taskNameDiv";
    taskName.className = "taskName";
    taskBtns.className = "col-3 taskBtns";
    startBtn.className = "btn start";
    endBtn.className = "btn end";
    removeBtn.className = "btn removeBtn";

    taskOuterCont.id = "task"+i;
    taskNameDiv.id = "taskNameDiv"+i;
    time.id = "time"+i;
    

    removeIcon.src = "/icons/x-circle.svg"

    if(tasks[i].duration != null){
        var convertMin = Math.floor(tasks[i].duration / 60);
        var convertSec = tasks[i].duration - (convertMin * 60);

        time.innerHTML = `Duration: ${convertMin}mins ${convertSec}sec`;
        startBtn.disabled = true;
    }
    else {
        time.innerHTML = "No duration. Task is not done"
    }
    

    startBtn.innerHTML = "start";
    endBtn.innerHTML = "end";
    endBtn.disabled = true;

    startBtn.setAttribute("onclick", "start(this.parentElement.parentElement.parentElement.id);");
    endBtn.setAttribute("onclick", "end(this.parentElement.parentElement.parentElement.id);");
    removeBtn.setAttribute("onclick", "removeTask(this.parentElement);")

    startBtn.id = "start"+i;
    endBtn.id = "end"+i;

    

    taskName.value = tasks[i].taskName;

    removeBtn.appendChild(removeIcon);

    taskNameDiv.appendChild(taskName);
    taskNameDiv.appendChild(time);
    taskBtns.appendChild(startBtn);
    taskBtns.appendChild(endBtn);

    taskCont.appendChild(taskNameDiv);
    taskCont.appendChild(taskBtns);

    taskOuterCont.appendChild(taskCont);
    taskOuterCont.appendChild(removeBtn);

    taskTrackerCont.appendChild(taskOuterCont);

}

function sortTasks() {
    var option = document.getElementById("dropdownsort").value;
    
    var task = 0;

    for(var i = 0; i < tasks.length; i++){
        task = document.getElementById("task"+i);
        task.remove();
    } 

    if(option == "duration"){
        tasks.sort((a,b) => a.duration - b.duration)
        console.log(tasks);

    }
    else {
        tasks.sort((a,b) => a.addTime - b.addTime)
        console.log(tasks);
    }

    for(var i = 0; i < tasks.length; i++){
        renderTasksSort(i);
    } 

}




