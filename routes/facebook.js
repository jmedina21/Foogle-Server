const express = require('express')
const puppeteer = require('puppeteer')
const fs = require('fs/promises')
const router = express.Router()

router.get('/', async (req, res) => {
    const {search} = req.query
    console.time('Time to get info');
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://www.facebook.com/marketplace/nyc/search/?query=${search}&exact=false`);

    const scrollDown = async () => {
        await page.evaluate(() => {
            window.scrollBy(0, window.innerHeight);
        });
    };

    for (let i = 0; i < 12; i++) {
        await scrollDown();
        await page.waitForTimeout(10);
    }

    const items = await page.evaluate(() => {
        const results = [];
        const listings = Array.from(document.querySelectorAll('div[style="max-width:381px;min-width:242px"]'));
      
        listings.forEach((listing) => {
          const titleElement = listing.querySelector('span[style*="-webkit-box-orient:vertical;"]');
          const priceElement = listing.querySelector('span.x193iq5w.xeuugli.x13faqbe.x1vvkbs.xlh3980.xvmahel.x1n0sxbx.x1lliihq.x1s928wv.xhkezso.x1gmr53x.x1cpjm7i.x1fgarty.x1943h6x.x4zkp8e.x3x7a5m.x1lkfr7t.x1lbecb7.x1s688f.xzsf02u');
          const imageElement = listing.querySelector('img[referrerpolicy="origin-when-cross-origin"]');
          const linkElement = listing.querySelector('a[role="link"]');
          const locationElement = listing.querySelector('span.x1lliihq.x6ikm8r.x10wlt62.x1n2onr6.xlyipyv.xuxw1ft');

          const title = titleElement ? titleElement.innerText.trim() : null;
          const price = priceElement ? priceElement.innerText.trim().split(' ')[0] : null;
          const imageUrl = imageElement ? imageElement.src : null;
          const link = linkElement ? linkElement.href : null;
          const location = locationElement ? locationElement.innerText.trim() : null;
      
          results.push({ title, price, imageUrl, link, location });
        });
      
        return results;
      });
      
    await fs.writeFile('fb.json', JSON.stringify(items, null, 2));

    console.log('Items extracted and saved to fb.json');
    await browser.close();
    res.json(items)
})

module.exports = router;
