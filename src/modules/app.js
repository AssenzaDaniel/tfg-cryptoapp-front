import AppBar from '/components/bars/appbar.js'
import TabBar from '/components/bars/tabbar.js'
import Modal from '/components/modal.js'
import AppWrapper from '/components/appwrapper.js'

import Table from '/components/table.js'

class App {

    #appBar
    #tabBar
    #table
    #modal
    #appWrapper

    #views
    
    constructor() {
        
        this.#appBar = new AppBar()
        this.#tabBar = new TabBar()
        this.#table = new Table()
        this.#modal = new Modal()
        this.#appWrapper = new AppWrapper()
        
        this.#render()
        this.#initializeElements()

        const a = document.createElement('p')
        a.innerText = 'Espacio 2'
        a.id = 'wallet'

        const b = document.createElement('p')
        b.innerText = 'Espacio 3'
        b.id = 'favs'
        
        this.#views = [
            this.#table,
            a, b
        ]
    }

    #render() {
        const app = document.createElement('div')
        app.id = 'app'

        app.appendChild(this.#appBar)
        app.appendChild(this.#tabBar)
        app.appendChild(this.#modal)
        app.appendChild(this.#appWrapper)
        
        document.body.appendChild(app)
    }

    #initializeElements() {
        this.#table.id = 'home'

        this.#appBar.src = 'assets/logo.png'
        this.#appWrapper.content = this.#table
        this.#tabBar.addEventListener('change', () => this.#updateWrapper())
    }

    #updateWrapper() {
        const selectedTab = this.#tabBar.selectedTab
        const view = this.#views.find(view => view.id === selectedTab)

        this.#appWrapper.content = view
    }
}

const app = new App()