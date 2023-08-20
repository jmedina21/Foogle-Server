const express = require('express')
const puppeteer = require('puppeteer')
const fs = require('fs/promises')
const router = express.Router()

router.get('/', async (req, res) => {

    const {search} = req.query
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://newyork.craigslist.org/search/sss?query=${search}`);

    const scrollDown = async () => {
        await page.evaluate(() => {
            window.scrollBy(0, window.innerHeight);
        });
    };

    for (let i = 0; i < 40; i++) {
        await scrollDown();
        await page.waitForTimeout(30);
    }
    const items = await page.evaluate(() => {
        const results = [];
        const listings = Array.from(document.querySelectorAll('li.cl-search-result'));
    
        listings.forEach((listing) => {
          const titleElement = listing.querySelector('.cl-app-anchor.text-only .label');
          const priceElement = listing.querySelector('.priceinfo'); 
          const imageElement = listing.querySelector('.gallery-inner img');
          const linkElement = listing.querySelector('.cl-app-anchor.text-only');
          const locationElement = listing.querySelector('.meta');
    
          const title = titleElement ? titleElement.innerText.trim() : null;
          const price = priceElement ? priceElement.innerText.trim() : null;
          const imageUrl = imageElement ? imageElement.src : null;
          const link = linkElement ? linkElement.href : null;
          const location = locationElement ? locationElement.innerText.split('·')[1].trim() : null;
    
          results.push({ title, price, imageUrl, link, location });
        });
    
        return results;
    });

    await fs.writeFile('craig.json', JSON.stringify(items, null, 2));

    await browser.close();
    res.send(items)
})

module.exports = router;