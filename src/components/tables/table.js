import TableContent from './tablecontent.js'
import { getUpdates, getSymbol } from '/services/index.js'

/**
 * Componente Tabla
 */
class Table extends HTMLElement {

    #title
    #table
    #tableStyle
    #favoritesTable
    #alreadyRendered
    #updatesEvent
    #onCreate
    #onClick
    #symbols
    #_symbols

    /**
     * 
     * @param {String} title Es el título que se muestra de la tabla
     * @param {Function} onCreate Function a ejecutar para obtener los symbolos deseados
     * @param {Boolean} allowsFavorites Habilitar que los componentes de la tabla sean marcados como favorito
     * @param {"list" | "cards"} tableStyle Define el estilo como se mostrará la tabla
     */
    constructor(title = '', onCreate, allowsFavorites = false, tableStyle) {
        super()

        this.#tableStyle = tableStyle
        this.#favoritesTable = allowsFavorites
        this.#alreadyRendered = false
        this.#onCreate = onCreate
        this.#title = title
    }
    
    /**
     * Método que se ejecuta al renderizar el componente en el DOM,
     * Ejecuta la función onCreate para obtener los symbolos y con ellos
     * renderiza cada uno de los elementos
     */
    async connectedCallback() {
        if (this.#alreadyRendered) return
        
        this.render()
        this.#alreadyRendered = true

        this.#table = this.querySelector('.content')
        this.querySelector('h2').innerText = this.getAttribute('title') || this.#title

        this.#generateContent()
    }
    
    /**
     * Método que actualiza los datos de la tabla para saber qué símbolos contiene,
     * y si la tabla permite favoritos entonces añade un custom event al ser presionado
     * el ícono de favorito
     * @param {*} symbols 
     */
    updateContent(symbols) {
        this.#symbols = []
        this.#_symbols = []
        this.#table.innerHTML = ''

        symbols.forEach(symbol => this.#addElement(symbol))

        this.#update()
    }

    /**
     * Añade el símbolo a la tabla
     * @param {JSON} symbol
     */
    #addElement(symbol) {
        const content = new TableContent(symbol, this.#favoritesTable)

        this.#symbols.push(symbol.symbol)
        this.#_symbols.push(content)
        this.#table.appendChild(content)

        if (!this.#favoritesTable || !this.#onClick) return

        content.addEventListener('fav:click', this.#onClick)
    }

    /**
     * Añade un símbolo a la tabla y actualiza el server event
     * @param {JSON} symbol Simbolo a añadir a la tabla
     */
    addElement(symbol) {
        if (!this.#alreadyRendered) return

        this.#addElement(symbol)
        this.#update()
    }

    /**
     * Elimina un símbolo de la tabla y actualiza el server event
     * @param {String} symbol Símbolo a eliminar
     */
    removeElement(symbol) {
        if (!this.#alreadyRendered) return

        const elementToDelete = this.#_symbols.find(element => element.id === symbol)
        elementToDelete.remove()
        
        this.#_symbols = this.#_symbols.filter(element => element !== elementToDelete)
        this.#symbols = this.#symbols.filter(element => element !== symbol)

        this.#update()
    }

    /**
     * Método que se encarga de actualziar lso simbolos de la tabla, para ello
     * abre una conexión de tipo Server Events para recibir las actualizaciones y con ello
     * manda al componente contenido de la tabla que se actualice
     */
    async #update() {
        if (this.#updatesEvent) this.#updatesEvent.close()

        this.#updatesEvent = await getUpdates(this.#symbols)
            
        this.#updatesEvent.addEventListener('message', event => {
            const symbols = JSON.parse(event.data)
                        
            symbols.forEach(symbol => {
                const element = this.#_symbols.find(element => element.id === symbol.symbol)
                if (element) element.update(symbol)
            })
        })

        this.#updatesEvent.addEventListener('error', event => {
            console.info(`Lost connection with server, retry in 3s`)
        })
    }


    /**
     * Setter que permite establecer un comportamiento al ser seleccionado
     * un elemento de la tabla
     * @param {Function} event Función a ejecutarse
     */
    set onClick(event) {
        this.#onClick = event
    }

    /**
     * @param {String} symbol Símbolo a desmarcar como favorito
     */
    unmarkSymbol(symbol) {
        const element = this.#_symbols.find(element => element.id === symbol)
        
        if (element) element.unmark()
    }

    /**
     * Actualiza la tabla, se utiliza al realizarse el login del usuario
     */
    updateTable() {
        if (!this.#alreadyRendered) return
        
        this.#generateContent()
    }

    /**
     * Vuelve a generar el contenido de la tabla con la funcion de creación
     */
    #generateContent() {
        this.#onCreate()
            .then(symbols => this.updateContent(symbols))
            .catch(error => this.#table.innerText = 'Sin conexión con el servidor')
    }

    render() {
        this.className = this.#tableStyle
        this.innerHTML = `
        <h2></h2>
        <div class="content"></div>
        `
    }
}

window.customElements.define('c-table', Table)
export default Table