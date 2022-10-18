const todoForm = document.querySelector(".todo-form");
const todoList = document.querySelector(".todo-list");
const totalTasks = document.querySelector(".total-tasks span");
const completedTasks = document.querySelector(".completed-tasks span");
const remainingTasks = document.querySelector(".remaining-tasks span");

// create an empty array
let tasks = [];

// function to submit form
todoForm.addEventListener("submit", (el) => {
  el.preventDefault();

  const title = document.getElementById("title");
  const titleValue = title.value;
  const descr = document.getElementById("descr");
  const descrValue = descr.value;
  const datetime = document.getElementById("datetime");
  const datetimeValue = datetime.value;

  if (titleValue === "") {
    alert("Fill in the title box!");
  } else if (descrValue === "") {
    alert("Fill in the description box!");
  } else if (datetimeValue === "") {
    alert("Fill in the date & time!");
  } else {
    const task = {
      id: new Date().getTime(),
      title: titleValue,
      descr: descrValue,
      datetime: datetimeValue,
      isCompleted: false,
    };
    tasks.push(task);
    createTask(task);
    todoForm.reset();
  }
  title.focus();
});

// function to remove a task
todoList.addEventListener("click", (el) => {
  if (
    el.target.classList.contains("remove-task") ||
    el.target.parentElement.classList.contains("remove-task")
  ) {
    const taskId = el.target.closest("li").id;
    removeTask(taskId);
  }
});

// function to update a task
todoList.addEventListener("input", (el) => {
  const taskId = el.target.closest("li").id;
  updateTask(taskId, el.target);
});

// prevent new lines on pressing enter key
todoList.addEventListener("keydown", (el) => {
  if (el.keyCode === 13) {
    el.preventDefault();
  }
});

// function to create a task
function createTask(task) {
  const taskEl = document.createElement("li");
  taskEl.setAttribute("id", task.id);

  const taskElMarkup = `
    <div class="checkbox-wrapper">
      <input type="checkbox" id="${task.title}-${task.id}" name="tasks" ${
    task.isCompleted ? "checked" : ""
  } />
      <div ${
        !task.isCompleted ? "contenteditable" : ""
      } class=" task taskTitle"><b>${task.title}</b></div><br>
      <div ${!task.isCompleted ? "contenteditable" : ""} class="task">${
    task.descr
  }</div><br>
      <div ${!task.isCompleted ? "contenteditable" : ""} class="task">${
    task.datetime
  }</div>
      <div class="computedTime"></div>
    </div>

    <button class="remove-task" title="Remove ${task.title} task">
      X
    </button>
  `;
  taskEl.innerHTML = taskElMarkup;
  todoList.appendChild(taskEl);
  countTasks();
}

// function to remove a task
function removeTask(taskId) {
  tasks = tasks.filter((task) => task.id !== parseInt(taskId));
  document.getElementById(taskId).remove();
  countTasks();
}

// function to update a task
function updateTask(taskId, el) {
  const task = tasks.find((task) => task.id === parseInt(taskId));

  if (el.hasAttribute("contentEditable")) {
    task.title = el.textContent;
    task.descr = el.textContent;
    task.datetime = el.textContent;
  } else {
    const div = el.nextElementSibling.nextElementSibling;
    task.isCompleted = !task.isCompleted;
    if (task.isCompleted) {
      div.removeAttribute("contenteditable");
      el.setAttribute("checked", "");
      // completionTime(task.datetime);
    } else if (!task.isCompleted) {
      el.removeAttribute("checked");
      div.setAttribute("contenteditable", "");
      // document.querySelector("computedTime").innerHTML = "";
    }
  }
  // tasks.push(task);
  countTasks();
}

// function to count tasks
function countTasks() {
  totalTasks.textContent = tasks.length;
  const completedTasksArray = tasks.filter((task) => task.isCompleted === true);
  completedTasks.textContent = completedTasksArray.length;

  remainingTasks.textContent = tasks.length - completedTasksArray.length;

  // // check if completed tasks is zero
  // if (completedTasksArray.length === 0) {
  //   document.querySelector(".message").innerHTML = "No completed tasks";
  //   // alert("No completed tasks");
  // // } else if (completedTasksArray.length > 0) {
  // //   document.querySelector(".message").innerHTML = "";
  // // }

  // // check if uncompleted tasks is zero
  // if ((tasks.length - completedTasksArray.length) === 0) {
  //   document.querySelector(".message").innerHTML = "No remaining tasks";
  //   // alert("No remaining tasks");
  // // } else if (tasks.length - completedTasksArray.length > 0) {
  // //   document.querySelector(".message").innerHTML = "";
  // // }
}

// function completionTime(task) {
//   // const task = tasks.find.filter((task) => task.id === parseInt(taskId) && task.isCompleted === true);
//   // const object = Object.values(task);
//   // const date = object[3];

//   let time = new Date(task.datetime);
//   let Time = time.getTime();
//   let Today = new Date();
//   let today = Today.getTime();
//   let hour = 1000 * 60 * 60;
//   let hours = parseFloat((today - Time) / hour);

//   if (hours < 1) {
//     let minutes = parseFloat(hours * 60);

//     if (minutes < 1) {
//       let earlytime = document.querySelector(".computedTime");
//       earlytime.innerHTML = "completed " + Math.round(Math.abs(minutes)) + " minutes early";
//     }
//     else if (minutes > 1 && minutes < 60) {
//       let latetime = document.querySelector(".computedTime");
//       latetime.innerHTML = "completed " + Math.round(minutes) + " minutes late";
//     }
//     else if (minutes >= 60) {
//       let hourTime = minutes * 24;
//       let htime = document.querySelector(".computedTime");

//       if (hourTime > 1) {
//         htime.innerHTML = "completed " + hourTime + " hours late";
//       }
//       else if (hourTime === 1) {
//         htime.innerHTML = "completed " + hourTime + " hour late";
//       }
//     }
//   }
// }