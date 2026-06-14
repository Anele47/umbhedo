// HOME PAGE

const previewTasks = document.getElementById("previewTasks");

if(previewTasks){

  function showTasks(){

    previewTasks.innerHTML = "";

    let completed = 0;

    const currentUser = localStorage.getItem("currentUser");

const tasks = JSON.parse(
    localStorage.getItem("tasks_" + currentUser)
) || [];

    tasks.forEach(task => {

      const taskDiv = document.createElement("div");
      taskDiv.classList.add("task");

      if(task.completed){
        completed++;
        taskDiv.style.textDecoration = "line-through";
        taskDiv.style.color = "gray";
      }

      taskDiv.innerHTML = task.text;

      previewTasks.appendChild(taskDiv);

    });

    let progress = 0;

if (totalTasks > 0) {
    progress = Math.round((completedTasks / totalTasks) * 100);
}


    document.getElementById("totalTasks").textContent = tasks.length;
    document.getElementById("completedTasks").textContent = completed;
    document.getElementById("pendingTasks").textContent = tasks.length - completed;
    document.getElementById("progressPercentage").textContent = progress + "%";

  }

  showTasks();

}
const currentUser = localStorage.getItem("currentUser");

const savedTasks = JSON.parse(
    localStorage.getItem("tasks_" + currentUser)
) || [];

const totalTasks = savedTasks.length;

const completedTasks = savedTasks.filter(task => task.completed).length;

const pendingTasks = savedTasks.filter(task => !task.completed).length;

 let progressPercentage = 0;

if (totalTasks > 0) {
    progressPercentage = Math.round((completedTasks / totalTasks) * 100);
}

document.getElementById("totalTasks").textContent = totalTasks;

document.getElementById("completedTasks").textContent = completedTasks;

document.getElementById("pendingTasks").textContent = pendingTasks;

document.getElementById("progressPercentage").textContent= progressPercentage + "%";



async function loadQuote() {

  const quote =
  document.getElementById("quote");

  quote.textContent =
  "Loading quote...";

  try {

    const response = await fetch(
      "https://dummyjson.com/quotes/random"
    );

    const data = await response.json();

    quote.textContent =
      `"${data.quote}" - ${data.author}`;

  }

  catch(error) {

    quote.textContent =
      "Failed to load quote.";

  }

}

loadQuote();


const sidebar = document.querySelector(".sidebars");
const menuBtn = document.getElementById("menuBtn");

menuBtn.addEventListener("click", () => {
  sidebar.classList.toggle("hide");
});

const links = document.querySelectorAll(".sidebar a");
const currentPage = window.location.pathname.split("/").pop();

links.forEach(link => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});


