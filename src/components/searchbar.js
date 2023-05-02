class SearchBar extends HTMLElement {

    #alreadyRendered = false

    constructor() {
        super()
    }

    connectedCallback() {        
        this.render()
        this.#alreadyRendered = true
    }

    animate() {
        this.className = this.isActive ? '' : 'active'
        document.getElementById('app-background').className = this.isActive ? '' : 'active'
        
        this.isActive = !this.isActive
    }

    render() {

        const div = document.createElement('div')
        div.id = 'app-background'
        div.innerHTML = `
        <style>
            #app-background {
                display: block;
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background-color: gainsboro;
                opacity: 0;
                z-index: 0;
                transition: 0.4s ease-in-out;
            }
            #app-background.active {
                opacity: 0.3;
                z-index: 39;
            }
        </style>
        `
        this.parentNode.appendChild(div)

        this.innerHTML = `
        <style>
            search-bar {
                position: fixed;
                display: block;
                background-color: white;
                width: 90%;
                left: 5%;
                border-radius: 15px;
                box-shadow: 0px 5px 15px -6px gainsboro;
                box-sizing: border-box;
                z-index: 40;
                padding: 15px;
                transition: 0.7s cubic-bezier(0.08, 1.14, 0.68, 0.98), opacity 0.2s;
                opacity: 0;
                color: gray;
            }

            search-bar.active {
                transform: translateY(90px);
                opacity: 1;
            }

            input[type="text"] {
                padding: 0;
                width: 100%;
                height: fit-content;
                box-sizing: border-box;
                outline: none;
                border: none;
                font-size: 1rem;
                letter-spacing: 0.3px;
            }

            input[type="text"]::placeholder {
                color: gray;
                opacity: 0.6;
            }
        </style>
        <input type="text" placeholder="Buscar ...">
        `
    }
}

window.customElements.define('search-bar', SearchBar)
export default SearchBar