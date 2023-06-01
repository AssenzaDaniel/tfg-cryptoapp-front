import AppBar from '/components/bars/appbar.js'
import TabBar from '/components/bars/tabbar.js'
import Modal from '/components/modal.js'
import AppWrapper from '/components/appwrapper.js'
import Search from '/components/search.js'

import Table from '/components/tables/table.js'
import { getSymbols, getSubscriptionsSymbols } from '/services/index.js'

class App {

    #appBar
    #tabBar
    #table
    #favs
    #modal
    #appWrapper
    #search

    #views
    
    constructor() {
        
        this.#appBar = new AppBar()
        this.#tabBar = new TabBar()
        this.#table = new Table('Hottest', getSymbols, false, 'list')
        this.#favs = new Table('Favs', getSubscriptionsSymbols, true, 'cards')
        this.#modal = new Modal()
        this.#appWrapper = new AppWrapper()
        this.#search = new Search()

        const b = document.createElement('p')
        b.innerText = 'Espacio 2'
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

    #initializeElements() {
        this.#table.id = 'home'
        this.#favs.id = 'favs'
        this.#favs.add('click', () => console.log('ok'))

        this.#appBar.src = 'assets/logo.png'

        this.#tabBar.addEventListener('change', () => this.#updateWrapper())

        this.#appBar.addEventListener('opensearch', () => {
            this.#search.show()
        })

        this.#appBar.addEventListener('openuser', () => {
            this.#modal.className = 'active'
        })
    }

    #updateWrapper() {
        const selectedTab = this.#tabBar.selectedTabId
        const view = this.#views.find(view => view.id === selectedTab)

        this.#appWrapper.content = view
    }
}

sessionStorage.setItem('email', 'assenzadaniel@gmail.com')
const app = new App()