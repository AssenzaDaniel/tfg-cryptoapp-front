class SearchBar extends HTMLElement {

    #alreadyRendered = false
    isActive = false
    #isWritting = false
    
    #background = null
    #input = null
    #onInputChange = null

    constructor() {
        super()
    }

    connectedCallback() {        
        this.render()
        this.#alreadyRendered = true

        this.#onInputChange = new Event('change')

        this.#background = document.querySelector('#background')
        this.#input = document.querySelector('input')
        this.#input.addEventListener('input', () => this.#handleInputChange())
    }

    #handleInputChange() {
        if (this.#isWritting) return

        this.#isWritting = true

        setTimeout(() => {
            this.dispatchEvent(this.#onInputChange)
            this.#isWritting = false
        }, 500)
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
            this.#input.focus()
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

    get text() {
        return this.#input.value
    }

    render() {

        const div = document.createElement('div')
        div.id = 'background'
        div.innerHTML = `
        <style>
            #background {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background-color: #0f0f0f;
                opacity: 0;
                animation: hideOverlay 0.8s;
            }
            #background.active {
                display: block;
                animation: showOverlay 0.8s forwards;
            }

            @keyframes showOverlay {
                from {
                    opacity: 0;
                }
                to {
                    opacity: 0.8;
                }
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