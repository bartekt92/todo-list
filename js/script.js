{
    const welcome = () => {
        console.log("Witajcie programiści!")
    }
    const tasks = [

    ];

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });
        render();
    };


    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    };

    const doneTask = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    };
    const bindEvents = () => {

        const removeButtons = document.querySelectorAll(".js-eraseButton");
        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });
        const doneButtons = document.querySelectorAll(".js-doneButton");
        doneButtons.forEach((doneButton, taskIndex) => {
            doneButton.addEventListener("click", () => {
                doneTask(taskIndex);
            });
        });
    }

    const render = () => {
        let htmlString = "";
        for (const task of tasks) {
            htmlString += ` <li class="taskList__li"><button
            class="taskList__actionButton taskList__actionButton--visited js-doneButton">✔</button>
        <div ${task.done ? "class= \"taskList__text taskList__text--done\"" : "class= \"taskList__text\""}> ${task.content}</div><button
            class="taskList__actionButton taskList__actionButton--red js-eraseButton">🗑</button>
    </li>
    <hr class="taskList__line">
           `
        }
        document.querySelector(".js-tasks").innerHTML = htmlString;
        bindEvents();
    };


    const onFormSubmit = (event) => {
        event.preventDefault();
        const newTaskContent = document.querySelector(".js-newTask").value.trim();
        if (newTaskContent === "") {
            return;
        };
        addNewTask(newTaskContent);
        document.querySelector(".js-newTask").value = "";
    };

    const init = () => {
        welcome();
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
        render();
    }
    init();

}