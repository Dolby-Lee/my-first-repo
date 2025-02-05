document.addEventListener("DOMContentLoaded", function () {
    const userForm = document.getElementById("user-form");
    const taskList = document.getElementById("task-list");
    const userPointsDisplay = document.getElementById("user-points");

    let user = JSON.parse(localStorage.getItem("user")) || {};
    let points = parseInt(localStorage.getItem("points")) || 0;
    
    if (user.name) {
        document.getElementById("username").value = user.name;
        document.getElementById("birthdate").value = user.birthdate;
        document.getElementById("gender").value = user.gender;
    }

    userPointsDisplay.innerText = `點數：${points}`;

    userForm.addEventListener("submit", function (e) {
        e.preventDefault();
        user = {
            name: document.getElementById("username").value,
            birthdate: document.getElementById("birthdate").value,
            gender: document.getElementById("gender").value
        };
        localStorage.setItem("user", JSON.stringify(user));
        alert("設定已儲存！");
    });

    const tasks = [
        { id: 1, title: "寫下你的夢想", reward: 50 },
        { id: 2, title: "每日運動30分鐘", reward: 20 },
        { id: 3, title: "學習新技能30分鐘", reward: 30 }
    ];

    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach(task => {
            const li = document.createElement("li");
            li.className = "list-group-item";
            li.innerHTML = `${task.title} <button class="btn btn-success btn-sm" onclick="completeTask(${task.id})">完成</button>`;
            taskList.appendChild(li);
        });
    }

    window.completeTask = function (taskId) {
        const task = tasks.find(t => t.id === taskId);
        if (task) {
            points += task.reward;
            localStorage.setItem("points", points);
            userPointsDisplay.innerText = `點數：${points}`;
            alert(`任務完成！獲得 ${task.reward} 點數`);
        }
    };

    renderTasks();
});
