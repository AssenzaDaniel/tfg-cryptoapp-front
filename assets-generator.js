const fs = require('fs')

const generateSVGFile = () => {
    const dir = fs.readdirSync('./src/assets')
    const files = dir.filter(dir => dir.endsWith('.svg') || dir.endsWith('.png'))

    const assets = []

    files.forEach(file => {
        const format = file.endsWith('.svg') ? 'utf-8' : 'base64'
        const fileRead = fs.readFileSync(`./src/assets/${file}`, format)

        assets.push({ file: file.toLowerCase(), data: fileRead })
    })

    fs.writeFileSync('./src/assets/assets.js', `export const assets = ${JSON.stringify(assets)}`)
}

module.exports = generateSVGFile