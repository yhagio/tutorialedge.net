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

let set = {}

async function getPageInformation(query) {
    let data = set[query.path]
    return data;
}

async function generateHTML(query) {
    console.log(query)

    let data = await getPageInformation(query)
    try {
        const templateHTML = await fs.readFileSync(__dirname + '/misc/template.html')
        const source = templateHTML.toString()
        const template = handlebars.compile(source, {strict: true})
        const result = template(data)

        fs.writeFile(__dirname + '/temp/index.html', result, (err) => {
            if (err) console.log(err)
        })
    } catch (err) {
        console.log(err)
    }
}

async function generateImage() {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox'],
        timeout: 10000
    });
    const page = await browser.newPage();
    await page.goto('file://' + __dirname + '/temp/index.html');
    await page.screenshot({path: 'temp/test.png', clip: {x: 0, y: 0, width: 600, height: 310}});
    await browser.close();
}


app.get('/card', async (req, res) => {
    try {
        await generateHTML(req.query)
        await generateImage("page")
        res.sendFile(__dirname + "/temp/test.png")
    } catch (err) {
        res.send("An Exception has occured")
    }
})

app.get('/health', (req, res) => {
    res.send("ok")
})

async function initialize() {
    try{
        console.log("Populating Cache")
        let response = await axios.get('https://tutorialedge.net/algolia.json?v=1')
        
        response.data.map((page) => {
            set[page.url] = page
        })
        console.log("Starting Server...")
        app.listen(port, () => console.log(`listening on port: ${port}`))
        
    } catch (err) {
        console.log(err)
    }
}

initialize()