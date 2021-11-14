export class TodoDivBuilder {
    #todoDiv
    #isCompleted = false
    #content
    #trashButton
    #completeButton
    #contentListener = (event) => {}
    #completeListener = (event) => {}
    #removeListener = (event) => {}

    constructor() {
        this.makeDiv = this.makeDiv.bind(this)
        this.addContent = this.addContent.bind(this)
        this.addCompleteButton = this.addCompleteButton.bind(this)
        this.addTrashButton = this.addTrashButton.bind(this)
        this.addCompleteOnClickListener = this.addCompleteOnClickListener.bind(this)
        this.addRemoveOnClickListener = this.addRemoveOnClickListener.bind(this)
        this.build = this.build.bind(this)
    }

    makeDiv(cssClass) {
        this.#todoDiv = createElement('div', cssClass)
        return this
    }

    addContent(todoText, cssClass) {
        this.#content = createElement('li', cssClass, todoText)
        return this
    }

    addCompleteButton(innerHTML, cssClass) {
        this.#completeButton = createElement('button', cssClass, innerHTML)
        return this
    }

    addTrashButton(innerHTML, cssClass) {
        this.#trashButton = createElement('button', cssClass, innerHTML)
        return this
    }

    addCompleteOnClickListener(listener) {
        this.#completeListener = listener
        return this
    }

    addRemoveOnClickListener(listener) {
        this.#removeListener = listener
        return this
    }

    addContentListener(listener) {
        this.#contentListener = listener
        return this
    }

    setCompleted(isCompleted) {
        this.#isCompleted = isCompleted
        return this
    }

    build() {
        const buttonsAndListeners = [
            [this.#content, this.#contentListener],
            [this.#completeButton, this.#completeListener],
            [this.#trashButton, this.#removeListener]
        ]
        addListeners(buttonsAndListeners)

        appendDiv(
            this.#todoDiv, [
            this.#content,
            this.#completeButton,
            this.#trashButton
        ])

        if (this.#isCompleted) {
            this.#todoDiv.classList.add("completed")
        }

        return this.#todoDiv
    }
}

function createElement(type, cssClass, innerHTML = '') {
    const newElement = document.createElement(type)
    newElement.innerHTML= innerHTML
    newElement.classList.add(cssClass)
    return newElement
}

function appendDiv(div, elements) {
    elements.forEach(element => {
        if (!element) {
            return
        }
        div.appendChild(element)
    })
}

function addListeners(buttonsAndListeners) {
    buttonsAndListeners.forEach(pair => {
        pair[0].addEventListener('click', pair[1])
    })
}
