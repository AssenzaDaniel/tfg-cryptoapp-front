import AppBar from '/components/bars/appbar.js'
import TabBar from '/components/bars/tabbar.js'
import Modal from '/components/modal.js'
import AppWrapper from '/components/appwrapper.js'

import Table from '/components/table.js'

function App() {

    const appBar = new AppBar()
    const tabBar = new TabBar()
    const table = new Table()
    const modal = new Modal()
    const appWrapper = new AppWrapper()

    const components = [appBar, tabBar, table, modal]

    function render() {
        const app = document.createElement('div')
        app.id = 'app'

        app.appendChild(appBar)
        app.appendChild(tabBar)
        app.appendChild(modal)
        app.appendChild(appWrapper)
        
        document.body.appendChild(app)
        
        appBar.src = 'assets/logo.png'
        appWrapper.content = table
    }

    return {
        render
    }
}

const app = new App()

app.render()