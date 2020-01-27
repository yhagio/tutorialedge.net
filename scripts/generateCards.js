const fs = require('fs')
const axios = require('axios')
const puppeteer = require('puppeteer')
const handlebars = require('handlebars')
const HandlebarsIntl = require('handlebars-intl')
const tmp = require('tmp')

HandlebarsIntl.registerWith(handlebars);
const templateHTML = fs.readFileSync(__dirname + '/misc/template.html')
const source = templateHTML.toString()
let set = {}

async function generateHTML(path) {
    console.log("Generating HTML for card for path: %s", path)
    try {
        let data = set[path]
        const template = handlebars.compile(source, {strict: true})
        const result = template(data)
        
        fs.writeFileSync(__dirname + "/temp/index.html", result);
    } catch (err) {
        console.log(err)
        return null;
    }
}

async function generateImage(path) {

    if(!fs.existsSync(__dirname + "/images" + path + "card.png")) {
        const browser = await puppeteer.launch({
            args: ['--no-sandbox'],
            timeout: 10000
        });
        const page = await browser.newPage();   
    
        await page.goto("file://" + __dirname + "/temp/index.html");
        await fs.mkdirSync(__dirname + "/images" + path, { recursive: true })
        await page.screenshot({path: __dirname + "/images" + path + "card.png", clip: {x: 0, y: 0, width: 600, height: 330}});
        await browser.close();
    } else {
        console.log("Card already exists for path: %s", path)
    }
}

async function generateCards() {
    try{
        console.log("Populating Cache")
        
        let response = await axios.get('https://tutorialedge.net/algolia.json?v=1')
        response.data.map((page) => {
            set[page.url] = page
        })

        for(let path in set) {
            await generateHTML(path)
            await generateImage(path)
        }

        
    } catch (err) {
        console.log(err)
    }
}

generateCards()