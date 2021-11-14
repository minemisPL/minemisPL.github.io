import {OperationsManager} from "./todoOperations.js";
import {todoQuerySelectors} from "./todoData.js";
import {cssClasses} from "./todoData.js";
import {filter} from "./todoUtils.js";
import {loadLocalTodos} from "./saveTodos.js";

const querySelectors = todoQuerySelectors
const operationManager = new OperationsManager(querySelectors, cssClasses)

loadTodos()

querySelectors.button.addEventListener('click', operationManager.addTodoListener)
querySelectors.filterOption.addEventListener('click', filter)
querySelectors.clearButton.addEventListener('click', operationManager.clearTodos)

function loadTodos() {
    const todos = loadLocalTodos()
    todos.forEach(operationManager.createTodo)
}