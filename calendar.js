document.addEventListener("DOMContentLoaded", function () {

    const calendarEl = document.getElementById("calendar");
    const taskList = document.getElementById("taskList");
    const upcomingTasks = document.getElementById("upcomingTasks");

    // Get tasks from localStorage

    const currentUser = localStorage.getItem("currentUser");

const tasks = JSON.parse(
    localStorage.getItem("tasks_" + currentUser)
) || [];

    // Convert tasks to FullCalendar events
    const events = tasks.map(task => ({
    title: task.text,
    date: task.dueDate
}));

    // Create Calendar
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: "dayGridMonth",

        events: events,

        dateClick: function (info) {

            const selectedDate = info.dateStr;

            const dateTasks = tasks.filter(task =>
                task.dueDate === selectedDate
            );

            taskList.innerHTML = "";

            if (dateTasks.length === 0) {

                taskList.innerHTML =
                    "<li>No tasks due on this date.</li>";

            } else {

                dateTasks.forEach(task => {

                    const li = document.createElement("li");
                    li.textContent = task.text;

                    taskList.appendChild(li);

                });

            }
        }
    });

    calendar.render();

    // Display Upcoming Tasks
    displayUpcomingTasks();

    function displayUpcomingTasks() {

        upcomingTasks.innerHTML = "";

        const today = new Date();

        const todayString = new Date().toISOString().split("T")[0];

const upcoming = tasks.filter(task =>
    task.dueDate && task.dueDate >= todayString
);

        upcoming.sort((a, b) =>
            new Date(a.dueDate) - new Date(b.dueDate)
        );

        if (upcoming.length === 0) {

            upcomingTasks.innerHTML =
                "<li>No upcoming tasks.</li>";

            return;
        }

        upcoming.forEach(task => {

            const li = document.createElement("li");

            li.innerHTML = `
                <strong>${task.text}</strong><br>
                Due: ${task.dueDate}
            `;

            upcomingTasks.appendChild(li);

        });
    }

});

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