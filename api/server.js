const express = require('express')
const fs = require('fs')
const axios = require('axios')
const puppeteer = require('puppeteer')
const handlebars = require('handlebars')
const HandlebarsIntl = require('handlebars-intl')
const tmp = require('tmp')
const app = express()
const port = 8080

HandlebarsIntl.registerWith(handlebars);
app.use(express.static('temp'))

const templateHTML = fs.readFileSync(__dirname + '/misc/template.html')
const source = templateHTML.toString()
let set = {}

async function generateHTML(query) {
    console.log(query)
    try {
        let data = set[query.path]
        const template = handlebars.compile(source, {strict: true})
        const result = template(data)
        
        let tmpfile = tmp.tmpNameSync();
        fs.writeFileSync(tmpfile + ".html", result);
        return tmpfile;

    } catch (err) {
        console.log(err)
        return null;
    }
}

async function generateImage(htmlfile) {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox'],
        timeout: 10000
    });
    const page = await browser.newPage();
    await page.goto('file://' + htmlfile + ".html");
    let tmpfile = tmp.tmpNameSync();
    await page.screenshot({path: tmpfile + ".png", clip: {x: 0, y: 0, width: 600, height: 330}});
    await browser.close();

    return tmpfile;
}


app.get('/card', async (req, res) => {
    try {
        let htmlfile = await generateHTML(req.query)
        let filename = await generateImage(htmlfile)
        res.sendFile(filename + ".png")
    } catch (err) {
        console.log(err)
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