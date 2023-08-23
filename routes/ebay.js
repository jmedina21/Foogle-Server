const express = require('express')
const router = express.Router()
const puppeteer = require('puppeteer')
const fs = require('fs/promises')

router.get('/', async (req, res) => {

  const {search} = req.query
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`https://www.ebay.com/sch/i.html?_from=R40&_trksid=p4432023.m570.l1313&_nkw=${search}&_sacat=0`);

  const scrollDown = async () => {
    await page.evaluate(() => {
      window.scrollBy(0, window.innerHeight);
    });
  };

  for (let i = 0; i < 10; i++) {
    await scrollDown();
    await page.waitForTimeout(10);
  }

  const items = await page.evaluate(() => {
    const results = [];
    const listings = Array.from(document.querySelectorAll('div.s-item__wrapper.clearfix'));

    listings.forEach((listing) => {
        const titleElement = listing.querySelector('div.s-item__info.clearfix > a > div > span');
        const priceElement = listing.querySelector('span.s-item__price');
        const imageElement = listing.querySelector('img');
        const linkElement = listing.querySelector('div.s-item__info.clearfix > a');

      const title = titleElement ? titleElement.innerText.trim() : null;
      const price = priceElement ? priceElement.innerText.trim() : null;
      const imageUrl = imageElement ? imageElement.src : null;
      const link = linkElement ? linkElement.href : null;

      results.push({ title, price, imageUrl, link });
    });

    return results;
  });

  // await fs.writeFile('ebay.json', JSON.stringify(items, null, 2));

  await browser.close();
  res.send(items)
})

module.exports = router;
