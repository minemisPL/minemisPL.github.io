export const todoQuerySelectors = {
    input: document.querySelector('.todo-input'),
    button: document.querySelector('.todo-button'),
    elements: document.querySelector('.todo-list'),
    filterOption: document.querySelector('.todo-filter'),
    clearButton: document.querySelector('.clear-button')
}

export const cssClasses = {
    elementDiv: "todoDiv",
    element: "todo-item",
    completeButton: "complete-btn",
    trashButton: "trash-btn",
    completeIconInnerHTML: '<i class=\"fas fa-check\"></i>',
    trashIconInnerHTML: '<i class=\"fas fa-trash\"></i>',
    animation: "fall"
}
