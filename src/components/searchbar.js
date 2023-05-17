class SearchBar extends HTMLElement {

    #alreadyRendered = false
    #background = null
    #_input = null
    isActive = false

    constructor() {
        super()
    }

    connectedCallback() {        
        this.render()
        this.#alreadyRendered = true

        this.#background = document.querySelector('#background')
        this.#_input = document.querySelector('input')
    }

    animate() {
        if (this.isActive) {

            this.className = ''
            this.#background.className = ''
            document.onclick = null
        } 
        else {
            
            this.className = 'active'
            this.#background.className = 'active'
            this.#_input.focus()
            this.#waitForhideSearchBar()
        }
        
        this.isActive = !this.isActive
    }

    #waitForhideSearchBar() {
        document.onclick = (event) => {
            if (this.contains(event.target)) return
            
            this.animate()
            document.onclick = null
        }
    }

    get content() {
        return this.#_input.value
    }

    render() {

        const div = document.createElement('div')
        div.id = 'background'
        div.innerHTML = `
        <style>
            #background {
                display: block;
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background-color: #0f0f0f;
                opacity: 0;
                z-index: 0;
                transition: 0.5s ease-out;
            }
            #background.active {
                opacity: 0.8;
                z-index: 39;
            }
        </style>
        `
        this.parentNode.appendChild(div)

        this.innerHTML = `
        <div>
            <img src="assets/search.png" class="invert-color">
            <input type="text" placeholder="Buscar">
        </div>
        `
    }
}

window.customElements.define('search-bar', SearchBar)
export default SearchBar