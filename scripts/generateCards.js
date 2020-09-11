const fs = require('fs')
const axios = require('axios')
const puppeteer = require('puppeteer')
const handlebars = require('handlebars')
const HandlebarsIntl = require('handlebars-intl')
const tmp = require('tmp')
const path = require('path')

HandlebarsIntl.registerWith(handlebars);
const templateHTML = fs.readFileSync(__dirname + '/misc/template.html')
const source = templateHTML.toString()
let set = {}

async function generateHTML(path) {
    console.log("Generating HTML for card for path: %s", path)
    try {
        let data = set[path]
        console.log(data)
        const template = handlebars.compile(source, {strict: false})
        const result = template(data)
        
        fs.writeFileSync(__dirname + "/temp/index.html", result);
    } catch (err) {
        console.log(err)
        return null;
    }
}

async function generateImage(imagePath) {

    let imagesCDNPath = path.join(__dirname, "../../../", "tutorialedge", "images.tutorialedge.net", "cards")

    // if(!fs.existsSync(imagesCDNPath + imagePath + "card.png")) {
        const browser = await puppeteer.launch({
            args: ['--no-sandbox'],
            timeout: 10000
        });
        const page = await browser.newPage();   
    
        await page.goto("file://" + __dirname + "/temp/index.html");
        await fs.mkdirSync(imagesCDNPath + imagePath, { recursive: true })
        await page.setViewport({ width: 2048, height: 1170 });
        await page.screenshot({path: imagesCDNPath + imagePath + "card.png"});
        await browser.close();
    // } else {
    //     console.log("Card already exists for path: %s", imagePath)
    // }
}

async function generateCards() {
    try{
        console.log("Populating Cache")
        
        let response = await axios.get('https://tutorialedge.net/algolia.json')
        // console.log(response);
        response.data.map((page) => {
            console.log(page)
            let url = new URL(page.permalink)
            console.log(url.pathname)
            set[url.pathname] = page
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