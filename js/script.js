{
    let doneHide = false;
    let disabled = false;

    const welcome = () => {
        console.log("Witajcie programiści!")
    }
    let tasks = [

    ];

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];
        render();
    };


    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const toggleDoneTask = (taskIndex) => {
        const task = tasks[taskIndex];
        tasks = [
            ...tasks.slice(0, taskIndex),
            {
                ...task,
                done: !task.done,
            },
            ...tasks.slice(taskIndex + 1),
        ];
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
                toggleDoneTask(taskIndex);
            });
        });
    }


    const renderNewButtons = () => {
        const addNewButtons = document.querySelector(".js-addNewButtons");
        if (tasks.length) {
            addNewButtons.innerHTML = `<h2 class="section__header section__header--second">Lista zadań</h2>
     <button class="section__whiteButton js-showDoneTasksButton">${doneHide ? "Pokaż ukończone" : "Ukryj ukończone"}</button>
     <button ${tasks.every(({ done }) => done) ? "disabled" : ""} class="section__whiteButton js-doneAllTasksButton">Ukończ wszystkie</button>`;
            bindNewButtons();
        } else if (!tasks.length) {
            addNewButtons.innerHTML = `<h2 class="section__header section__header--second">Lista zadań</h2>`
        };
    };


    const toggleDoneAllTasks = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));
        render();
    };



    const bindNewButtons = () => {
        const allTasksDoneButton = document.querySelector(".js-doneAllTasksButton");

        allTasksDoneButton.addEventListener("click", () => {
            toggleDoneAllTasks();
        });

        const hideButton = document.querySelector(".js-showDoneTasksButton");
        hideButton.addEventListener("click", () => {
            doneHide = !doneHide;
            render();
        });
    };





    const render = () => {
        let htmlString = "";
        for (const task of tasks) {
            htmlString += ` <li class="section__list js-list ${doneHide && task.done ? "section__list--hide" : ""}">
            <button class="section__actionButton js-doneButton">${task.done ? "&#10004;" : ""}</button>
        <span class="section__text ${task.done ? "section__text--done" : ""}">${task.content}</span>
        <button class="section__actionButton section__actionButton--red js-eraseButton">&#128465;</button>
    </li>
    <hr class="section__line ${doneHide && task.done ? "section__line--hide" : ""}">
           `
        }
        document.querySelector(".js-tasks").innerHTML = htmlString;
        bindEvents();
        renderNewButtons();
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
