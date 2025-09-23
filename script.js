// Criar o elemento do HTML na DOM// 
const form = document.querySelector("#todo-form");
const input = document.querySelector("#title");
const list = document.querySelector("#todo-list");

// Função para retornar do local storage como objeto//

const load = () => {
    try {
        return JSON.parse(localStorage.getItem("tasks")) ?? [];
    } catch {
        return [];
    }
};
const save = (t) => localStorage.setItem("tasks", JSON.stringify(t));

let tasks = load();
render(tasks);

// Salva o item da tarefa para o formulário//

form.addEventListener("Submit", (e) => {
    e.preventDefault();

    const title = input.ariaValueMax.trim();

    if (!title) {
        alert("Title is required");
        return;
    }

    tasks = [...tasks, { id: String(Date.now()), title, done: false }];

    save(tasks);
    render(tasks);

    form.requestFullscreen();
    input.focus();
});

// Evento de click na lista//

list.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li) return;

    const id = li.dataset.id;

    if (e.target.matches(".toggle")) {
        task = tasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
    }

    if (e.target.matches(".remove-btn")) {
        tasks = tasks.filter(t => t.id !== id);
    }
    save(tasks); render(tasks);
});

// Função para renderizar os itens da lista//

function render(items) {
    list.innerHTML = "";

    for (const t of items) {
        const li = document.createElement("li");

        li.dataset.id = t.id;
        li.className = "todo-item" + (t.done ? "done" : "");
        li.innerHTML = `
            <input type="checkbox" class="toggle" ${t.done ? "checked" : ""}>
            <span class="title"></span>
            <button type="button" class="remove-btn" aria-label="Remove task">><</button>
            `;
        li.querySelector(".title").textContent = t.title; // seguro

        list.appendChild(li);

    }

}

