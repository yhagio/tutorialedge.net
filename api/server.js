const express = require('express')
const fs = require('fs')
const axios = require('axios')
const puppeteer = require('puppeteer')
const handlebars = require('handlebars')
const HandlebarsIntl = require('handlebars-intl')
const app = express()
const port = 8080

HandlebarsIntl.registerWith(handlebars);

app.use(express.static('temp'))

async function getPageInfo(query) {
    try{
        let response = await axios.get('https://tutorialedge.net/algolia.json')
        
        let page = response.data.filter((page) => {
            return page.url == query.path
        })

        if page.length < 1 {
            return null
        }

        return page[0]

    } catch (err) {
        console.log(err)
    }
}

async function generateHTML(query) {
    console.log(query)
    let data = await getPageInfo(query)
    if data === null {
        
    }
    

    const templateHTML = await fs.readFileSync(__dirname + '/misc/template.html')
    const source = templateHTML.toString()
    const template = handlebars.compile(source, {strict: true})
    const result = template(data)

    fs.writeFile(__dirname + '/temp/index.html', result, (err) => {
        if (err) console.log(err)
    })
}

async function generateImage() {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox'],
        timeout: 600
    });
    const page = await browser.newPage();
    await page.goto('file://' + __dirname + '/temp/index.html');
    await page.screenshot({path: 'temp/test.png', clip: {x: 0, y: 0, width: 600, height: 300}});
    await browser.close();
}


app.get('/card', async (req, res) => {

    console.log(req.query)
    await generateHTML(req.query)
    await generateImage("page")
    res.sendFile(__dirname + "/temp/test.png")
})

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.listen(port, () => console.log(`listening on port: ${port}`))