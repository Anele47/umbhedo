// TASK PAGE
//Task Javascript

const taskInput = document.getElementById("taskInput");
const prioritySelect = document.getElementById("prioritySelect");
const addTaskBtn = document.getElementById("addTaskBtn");

const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");
const dueDate = document.getElementById("dueDate");

let currentFilter = "all";

const taskList = document.getElementById("taskList");

const currentUser = localStorage.getItem("currentUser");

let tasks = JSON.parse(
    localStorage.getItem("tasks_" + currentUser)
) || [];

if (!currentUser) {
  window.location.href = "index.html";
}

/* ADD TASK */

addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task");
    return;
  }

 const task = {
  id: Date.now(),
  text: taskText,
  dueDate: dueDate.value || null,
  completed: false,
  important: prioritySelect.value === "important",
};

  tasks.push(task);

  saveTasks();

  taskInput.value = "";

  dueDate.value = "";

  displayTasks();
});

/* DISPLAY TASKS */
function displayTasks() {
  taskList.innerHTML = "";

  let filteredTasks = tasks;

  const searchValue = searchInput.value.toLowerCase();

  filteredTasks = filteredTasks.filter((task) =>
    task.text.toLowerCase().includes(searchValue)
  );

  if (currentFilter === "completed") {
    filteredTasks = filteredTasks.filter((task) => task.completed);
  }

  if (currentFilter === "pending") {
    filteredTasks = filteredTasks.filter((task) => !task.completed);
  }

  if (currentFilter === "important") {
    filteredTasks = filteredTasks.filter((task) => task.important);
  }

  filteredTasks.sort((a, b) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const getRank = (task) => {
    if (!task.dueDate) return 3; // no date = last

    const taskDate = new Date(task.dueDate);
    taskDate.setHours(0, 0, 0, 0);

    const diff = (taskDate - today) / (1000 * 60 * 60 * 24);

    if (diff < 0) return 0; // overdue / past due (first)
    if (diff === 0) return 1; // today
    return 2; // future
  };

  const rankA = getRank(a);
  const rankB = getRank(b);

  if (rankA !== rankB) return rankA - rankB;

  // if same category → sort by nearest date
  return new Date(a.dueDate || 0) - new Date(b.dueDate || 0);
});

  filteredTasks.forEach((task) => {

    const taskCard = document.createElement("div");
    taskCard.classList.add("tasks-cards");

    if (task.dueDate) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const taskDate = new Date(task.dueDate);
  taskDate.setHours(0, 0, 0, 0);

  if (taskDate < today && !task.completed) {
    taskCard.classList.add("overdue");
  }
}

    const taskInfo = document.createElement("div");
    taskInfo.classList.add("task-info");

    let status = "";

if (task.dueDate) {
  let today = new Date();
  today.setHours(0, 0, 0, 0);

  let taskDate = new Date(task.dueDate);
  taskDate.setHours(0, 0, 0, 0);

  const diffDays = (taskDate - today) / (1000 * 60 * 60 * 24);

  if (diffDays === 0) {
    status = "today";
  } else if (diffDays === 1) {
    status = "tomorrow";
  }
}

    const taskLeft = document.createElement("div");
    taskLeft.classList.add("task-left");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      saveTasks();
      displayTasks();
    });

    const taskName = document.createElement("div");
    taskName.classList.add("task-name");
    taskName.textContent = task.text;

    if (task.completed) {
      taskName.classList.add("completed");
    }

    if (task.important) {
  taskName.classList.add("important");
}

    taskLeft.appendChild(checkbox);
    taskLeft.appendChild(taskName);

    taskInfo.appendChild(taskLeft);

    

    const dateText = document.createElement("small");
    if (task.dueDate) {
  const options = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = new Date(task.dueDate).toLocaleDateString("en-US", options);
  dateText.textContent = `Due: ${formattedDate}`;
} else {
  dateText.textContent = "No due date";
}

    taskInfo.appendChild(dateText);

    const statusTag = document.createElement("span");
statusTag.classList.add("status-tag");

if (status) {
  statusTag.textContent = status.toUpperCase();
  statusTag.classList.add(status);
  taskInfo.appendChild(statusTag);
}

    const taskButtons = document.createElement("div");
    taskButtons.classList.add("task-buttons");

    const editBtn = document.createElement("i");
    editBtn.classList.add("fa-solid", "fa-pen", "edit-btn");

    editBtn.addEventListener("click", () => {
      const updated = prompt("Edit task:", task.text);
      if (updated && updated.trim() !== "") {
        task.text = updated;
        saveTasks();
        displayTasks();
      }
    });

    const deleteBtn = document.createElement("i");
    deleteBtn.classList.add("fa-solid", "fa-trash", "delete-btn");

    deleteBtn.addEventListener("click", () => {
      tasks = tasks.filter((t) => t.id !== task.id);
      saveTasks();
      displayTasks();
    });

    taskButtons.appendChild(editBtn);
    taskButtons.appendChild(deleteBtn);

    taskCard.appendChild(taskInfo);
    taskCard.appendChild(taskButtons);

    taskList.appendChild(taskCard);
  });
}

/* SEARCH + FILTER EVENTS */

searchInput.addEventListener("input", displayTasks);

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    currentFilter = button.dataset.filter;

    displayTasks();
  });
});

function saveTasks() {
  localStorage.setItem(
    "tasks_" + currentUser,
    JSON.stringify(tasks)
);
}

function loadTasks() {

  tasks = JSON.parse(
    localStorage.getItem("tasks_" + currentUser)
  ) || [];

  displayTasks();
}

loadTasks();

window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "dark";

  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
  }

  const savedFontSize = localStorage.getItem("fontSize") || "Medium";

  document.body.classList.remove("small-font", "medium-font", "large-font");

  if (savedFontSize === "Small") {
    document.body.classList.add("small-font");
  } else if (savedFontSize === "Large") {
    document.body.classList.add("large-font");
  } else {
    document.body.classList.add("medium-font");
  }
});






