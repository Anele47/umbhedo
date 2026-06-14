window.onload = function(){

   const currentUser =
localStorage.getItem("currentUser");

const users =
JSON.parse(localStorage.getItem("users")) || [];

const user =
users.find(u => u.email === currentUser);

if(user){

    document.getElementById("profileName")
    .textContent = user.name;

    document.getElementById("profileEmail")
    .textContent = user.email;

} 

    document.getElementById("aboutMe")
    .textContent =
    localStorage.getItem("about") || "No bio added yet";

    
    console.log("Current User:", currentUser);

const image =
localStorage.getItem("profileImage_" + currentUser);

console.log("Loaded Image:", image);

    if(image){

        document.getElementById("profileImage").src = image;

    }

    /* TASK STATISTICS */

    const tasks =
JSON.parse(
    localStorage.getItem("tasks_" + currentUser)
) || [];

const total = tasks.length;

const completed =
tasks.filter(task => task.completed).length;

const rate =
total > 0
? ((completed / total) * 100).toFixed(1)
: 0;

document.getElementById("totalTasks")
.textContent = total;

document.getElementById("completedTasks")
.textContent = completed;

document.getElementById("completionRate")
.textContent = rate + "%";

const streak = calculateStreak(tasks);

document.getElementById("streak").textContent = streak;

};

function calculateStreak(tasks) {
    const dates = tasks
        .filter(t => t.completed && t.completedDate)
        .map(t => {
            const d = new Date(t.completedDate);
            return new Date(d.getFullYear(), d.getMonth(), d.getDate());
        });

    const uniqueMap = new Map();
    dates.forEach(d => uniqueMap.set(d.toDateString(), d));

    const uniqueDates = [...uniqueMap.values()].sort((a, b) => b - a);

    let streak = 0;
    let today = new Date();
    today = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    for (let i = 0; i < uniqueDates.length; i++) {
        const diffDays = Math.floor(
            (today - uniqueDates[i]) / (1000 * 60 * 60 * 24)
        );

        if (diffDays === streak) {
            streak++;
        } else {
            break;
        }
    }

    return streak;
}

const currentUser = localStorage.getItem("currentUser");

document.addEventListener("DOMContentLoaded", () => {

  const theme =
    localStorage.getItem("theme_" + currentUser) || "dark";

  const fontSize =
    localStorage.getItem("fontSize_" + currentUser) || "Medium";

  /* THEME (DO NOT REMOVE PAGE CLASS) */
  if (theme === "light") {
    document.body.classList.add("light-mode");
  } else {
    document.body.classList.remove("light-mode");
  }

  /* FONT SIZE */
  document.body.classList.remove(
    "small-font",
    "medium-font",
    "large-font"
  );

  if (fontSize === "Small") {
    document.body.classList.add("small-font");
  } else if (fontSize === "Large") {
    document.body.classList.add("large-font");
  } else {
    document.body.classList.add("medium-font");
  }

});

