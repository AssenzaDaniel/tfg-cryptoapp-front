import { BindableHTMLElement } from "./bindable-element.js"
class SearchBar extends BindableHTMLElement {

    #alreadyRendered = false
    #background = null
    isActive = false

    constructor() {
        super()
    }

    connectedCallback() {        
        this.render()
        this.#alreadyRendered = true
        this.#background = document.querySelector('#background')
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
            this.#waitForhideSearchBar()
        }
        
        this.isActive = !this.isActive
    }

    muto() {
        this.style.backgroundColor = 'white'
    }

    #waitForhideSearchBar() {
        document.onclick = (event) => {
            if (this.contains(event.target)) return
            
            this.animate()
            document.onclick = null
        }
    }

    get content() {
        return this.querySelector('input').value
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
        <style>
            search-bar {
                position: fixed;
                display: block;
                background-color: var(--primary-color);
                width: 85%;
                left: 7.5%;
                border-radius: 15px;
                box-shadow: 0px 5px 15px -6px var(--shadow-color);
                box-sizing: border-box;
                z-index: 40;
                padding: 15px;
                transition: 0.7s cubic-bezier(0.08, 1.14, 0.68, 0.98), opacity 0.2s;
                opacity: 0;
            }

            search-bar.active {
                transform: translateY(90px);
                opacity: 1;
            }

            search-bar div {
                display: flex;
                gap: 15px;
            }

            search-bar div img {
                height: 25px;
            }

            search-bar div input {
                width: 100%;
                margin-left: 10rpx;
            }

            input[type="text"] {
                background-color: inherit;
                color: inherit;
                height: inherit;
                font-family: inherit;
                padding: 0;
                box-sizing: border-box;
                outline: none;
                border: none;
                font-size: 1.1rem;
            }

            input[type="text"]::placeholder {
                color: dimgray;
                font-family: inherit;
                opacity: 0.6;
            }
        </style>
        <div>
            <img src="assets/search.png" class="invert-color">
            <input type="text" placeholder="Buscar">
        </div>
        `
    }
}

window.customElements.define('search-bar', SearchBar)
export default SearchBar