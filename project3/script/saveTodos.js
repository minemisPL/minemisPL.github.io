export function saveLocalTodo(todoText) {
    let todos = loadLocalTodos()
    let todoTexts = []
    todos.forEach(todo => {
        todoTexts.push(todo.todoText)
    })

    if (todoTexts.includes(todoText)) {
        return
    }

    const newTodo = {
        todoText: todoText,
        isCompleted: false
    }

    todos.push(newTodo)
    localStorage.setItem('todos', JSON.stringify(todos))
}

export function loadLocalTodos() {
    let todos = []
    let todosLocal = localStorage.getItem('todos')

    if (todosLocal) {
        todos = JSON.parse(todosLocal)
    }

    return todos
}

export function removeLocalTodo(todoText) {
    let todos = loadLocalTodos()

    todos = todos.filter((todo) => {
        return todo.todoText !== todoText
    })

    localStorage.setItem('todos', JSON.stringify(todos))
}

export function setCompletedLocal(todoText, isCompleted) {
    let todos = loadLocalTodos()

    const todo = todos.find(todo => todo.todoText === todoText)

    todo.isCompleted = isCompleted

    const indexOfTodo = todos.indexOf(todo)
    todos[indexOfTodo] = todo

    localStorage.setItem('todos', JSON.stringify(todos))
}

export function clearLocal() {
    localStorage.setItem('todos', "")
}