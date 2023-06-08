import AppBar from '/components/bars/appbar.js'
import TabBar from '/components/bars/tabbar.js'
import Modal from '/components/modal.js'
import AppWrapper from '/components/appwrapper.js'
import Search from '/components/search.js'

import Table from '/components/tables/table.js'
import { getSymbols, getSubscriptionsSymbols } from '/services/index.js'

/**
 * Clase que funciona como controlador de la aplicación
 */
class App {

    #appBar
    #tabBar
    #table
    #favs
    #modal
    #appWrapper
    #search
    #views
    
    /**
     * Crea todos los componentes que usa la aplicación
     */
    constructor() {
        
        this.#appBar = new AppBar()
        this.#tabBar = new TabBar()
        this.#table = new Table('Hottest', getSymbols, false, 'list')
        this.#favs = new Table('Favs', getSubscriptionsSymbols, true, 'list')
        this.#modal = new Modal()
        this.#appWrapper = new AppWrapper()
        this.#search = new Search()

        const b = document.createElement('div')
        b.innerHTML = `
        <div class="resume">
            <div class="balance">
                <span>Total balance</span>
                <span>$ 0.00</span>
            </div>
            <div class="total">
                <span>Total Earnings</span>
                <span>$ 0.00</span>
            </div>
            <div class="add-btn">
                <div class="btn">Add</div>
            </div>
            <div class="del-btn">
                <div class="btn">Delete</div>
            </div>
        </div>
        `
        b.className = 'wallet'
        b.id = 'wallet'

        this.#views = [
            this.#table,
            this.#favs, 
            b
        ]
        
        this.#render()
        this.#initializeElements()
        this.#updateWrapper()
    }

    /**
     * Método que renderiza este componente en el DOM
     */
    #render() {
        const app = document.createElement('div')
        app.id = 'app'

        app.appendChild(this.#appBar)
        app.appendChild(this.#tabBar)
        app.appendChild(this.#modal)
        app.appendChild(this.#appWrapper)
        app.appendChild(this.#search)
        
        document.body.appendChild(app)
    }

    /**
     * Método que inicializa los componentes que usa app
     * una vez que se han renderizado en el DOM, se añade
     * lógica a los componentes que lo requieran
     */
    #initializeElements() {
        this.#table.id = 'home'
        this.#favs.id = 'favs'

        this.#favs.onClick = (event) => {
            const symbol = event.target

            if (!symbol.isActive) symbol.remove()
        }

        this.#tabBar.addEventListener('change', () => this.#updateWrapper())
        this.#appBar.addEventListener('opensearch', () => this.#search.show())
        this.#appBar.addEventListener('openuser', () => this.#modal.className = 'active')
    }

    /**
     * Método que actualiza el componente appWrapper una vez que
     * el usuario selecciona otra pestaña de la barra de navegación
     */
    #updateWrapper() {
        const selectedTab = this.#tabBar.selectedTab
        const view = this.#views.find(view => view.id === selectedTab)

        this.#appWrapper.content = view
    }
}

sessionStorage.setItem('email', 'assenzadaniel@gmail.com')
const app = new App()