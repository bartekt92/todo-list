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
            htmlString += ` <li class="section__list">
            <button class="section__actionButton js-doneButton">${task.done ? "&#10004;" : ""}</button>
        <span class="section__text ${task.done ? "section__text--done" : ""}">${task.content}</span>
        <button class="section__actionButton section__actionButton--red js-eraseButton">&#128465;</button>
    </li>
    <hr class="section__line">
           `
        }
        document.querySelector(".js-tasks").innerHTML = htmlString;
        bindEvents();
    };


    const onFormSubmit = (event) => {
        event.preventDefault();
        document.querySelector(".js-newTask").focus();
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