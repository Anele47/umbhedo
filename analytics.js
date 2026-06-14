const currentUser = localStorage.getItem("currentUser");

if (!currentUser) {
    window.location.href = "index.html";
}

const tasks = JSON.parse(
    localStorage.getItem("tasks_" + currentUser)
) || [];

const totalTasks = tasks.length;

const completedTasks = tasks.filter(task => task.completed).length;

const completionRate =
totalTasks > 0
? ((completedTasks / totalTasks) * 100).toFixed(1)
: 0;

document.getElementById("totalTasks").textContent = totalTasks;

document.getElementById("completedTasks").textContent = completedTasks;

document.getElementById("completionRate").textContent = completionRate + "%";

const importantTasks =
tasks.filter(task => task.important).length;

const normalTasks =
totalTasks - importantTasks;

const weeklyData = [0, 0, 0, 0, 0, 0, 0];

tasks.forEach(task => {
    if (task.completed && task.completedDate) {
        const date = new Date(task.completedDate);

        if (!isNaN(date)) {
            const day = date.getDay();
            weeklyData[day]++;
        }
    }
});

const monthlyData =
[0,0,0,0,0,0,0,0,0,0,0,0];

tasks.forEach(task => {

    if(task.completed && task.completedDate){

        const month =
        new Date(task.completedDate).getMonth();

        monthlyData[month]++;
    }
});

function calculateStreak(tasks) {
    const completedDates = tasks
        .filter(t => t.completed && t.completedDate)
        .map(t => new Date(t.completedDate).toDateString());

    const uniqueDays = [...new Set(completedDates)];

    let streak = 0;
    let currentDate = new Date();

    while (true) {
        if (uniqueDays.includes(currentDate.toDateString())) {
            streak++;
            currentDate.setDate(currentDate.getDate() - 1);
        } else {
            break;
        }
    }

    return streak;
}

const streak = calculateStreak(tasks);
document.getElementById("streak").textContent = streak;

new Chart(
document.getElementById("weeklyChart"),
{
    type:"bar",
    data:{
        labels:[
            "Sun",
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat"
        ],
        datasets:[{
            label:"Tasks Completed",
            data:weeklyData,
            backgroundColor:"#302D98"
        }]
    }
}
);

new Chart(
document.getElementById("priorityChart"),
{
    type:"pie",
    data:{
        labels:[
            "Important",
            "Normal"
        ],
        datasets:[{
            data:[
                importantTasks,
                normalTasks
            ],
            backgroundColor:[
                "teal",
                "blue"
            ]
        }]
    }
}
);

new Chart(
document.getElementById("monthlyChart"),
{
    type:"line",
    data:{
        labels:[
            "Jan","Feb","Mar","Apr",
            "May","Jun","Jul","Aug",
            "Sep","Oct","Nov","Dec"
        ],
        datasets:[{
            label:"Tasks Completed",
            data:monthlyData,
            borderColor:"#615AD0",
            backgroundColor:"#615AD0",
            tension:0.4
        }]
    }
}
);