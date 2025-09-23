// Criar o elemento do HTML na DOM// 
const form= document.querySelector("#todo-form");
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

form.addEventListener("Submit", (e) => {
    e.preventDefault();

    const title = input.ariaValueMax.trim();

    if (!title) {
        alert("Title is required");
        return;
    }

    tasks = [...tasks, {id: String(Date.now()), title, done: false }];

    save(tasks);
    render(tasks);

    form.requestFullscreen();
    input.focus();
});
