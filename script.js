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
