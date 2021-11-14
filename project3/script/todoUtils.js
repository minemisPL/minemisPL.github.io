import {todoQuerySelectors} from "./todoData.js";

export function filter(event) {
    const todos = todoQuerySelectors.elements.childNodes
    const mode = event.target.value

    todos.forEach(todo => {
        todo.style.display = "flex"

        if (mode === "all") {
            return
        }

        if (mode === "completed") {
            if (!todo.classList.contains("completed")) {
                todo.style.display = "none"
            }
            return
        }

        if (todo.classList.contains("completed")) {
            todo.style.display = "none"
        }
    })
}