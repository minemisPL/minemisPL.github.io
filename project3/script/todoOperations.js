import {saveLocalTodo} from "./saveTodos.js";
import {removeLocalTodo} from "./saveTodos.js";
import {setCompletedLocal} from "./saveTodos.js";
import {TodoDivBuilder} from "./todoBuilder.js";
import {clearLocal} from "./saveTodos.js";

export class OperationsManager {
    #querySelectors
    #cssClasses

    constructor(querySelectors, cssClasses) {
        this.#querySelectors = querySelectors
        this.#cssClasses = cssClasses
        this.createTodo =       this.createTodo.bind(this)
        this.addTodoListener =  this.addTodoListener.bind(this)
        this.completeTodo =     this.completeTodo.bind(this)
        this.removeTodo =       this.removeTodo.bind(this)
        this.clearTodos =       this.clearTodos.bind(this)
    }

    addTodoListener(event) {
        event.preventDefault()

        const todoText = this.#querySelectors.input.value

        const newTodo = {
            todoText: todoText,
            isCompleted: false
        }

        this.createTodo(newTodo)
        saveLocalTodo(todoText)

        this.#querySelectors.input.value = ""
    }

    createTodo(todoObject) {
        const todoText = todoObject.todoText
        const isCompleted = todoObject.isCompleted

        if (!todoText) {
            return
        }

        const todoDiv = new TodoDivBuilder()
            .makeDiv(this.#cssClasses.elementDiv)
            .addContent(todoText, this.#cssClasses.element)
            .addCompleteButton(this.#cssClasses.completeIconInnerHTML, this.#cssClasses.completeButton)
            .addTrashButton(this.#cssClasses.trashIconInnerHTML, this.#cssClasses.trashButton)
            .addCompleteOnClickListener(this.completeTodo)
            .addRemoveOnClickListener(this.removeTodo)
            .addContentListener(this.completeTodo)
            .setCompleted(isCompleted)
            .build()

        this.#querySelectors.elements.appendChild(todoDiv)
    }

    completeTodo(event) {
        if (event.target.innerHTML === this.#cssClasses.trashIconInnerHTML) {
            return
        }

        const todoDiv = event.target.parentElement

        if (todoDiv.classList.contains("completed")) {
            todoDiv.classList.remove("completed")
            setCompletedLocal(event.target.parentElement.innerText, false)
            return
        }

        todoDiv.classList.add("completed")
        setCompletedLocal(event.target.parentElement.innerText, true)
    }

    removeTodo(event) {
        const todoDiv = event.target.parentElement

        todoDiv.classList.add(this.#cssClasses.animation)
        todoDiv.addEventListener('transitionend', todoDiv.remove)

        removeLocalTodo(todoDiv.innerText)
    }

    clearTodos() {
        const todoDivs = Array.from(this.#querySelectors.elements.children)

        todoDivs.forEach(todoDiv => {
            todoDiv.classList.add(this.#cssClasses.animation)
            todoDiv.addEventListener('transitionend', todoDiv.remove)
        })

        clearLocal()
    }
}
