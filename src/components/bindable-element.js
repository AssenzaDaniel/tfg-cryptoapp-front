export class BindableHTMLElement extends HTMLElement {

    constructor() {
        super()
    }

    /**
     * Add a new event to the element
     * @param { String } event Event who triggers the action
     * @param { Function } action Action to bind
     */
    onEvent(event, action) {
        this.addEventListener(event, action)
    }

    /**
     * Bind an object and trigger an action on a given event
     * @param { String } event Event who triggers the action
     * @param { HTMLElement } element Element to bind action
     * @param { Function } action Action to bind, must be a method of the given object
     */
    bind(event, element, action) {
        action = action.name || action
        this.addEventListener(event, (event) => {
            element[action]()
            event.stopPropagation()
        })
    }
}