const express = require('express')
const puppeteer = require('puppeteer')
const fs = require('fs/promises')
const router = express.Router()

router.get('/', async (req, res) => {
    console.time('Time to get info');
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://newyork.craigslist.org/search/sss?query=nintendo');

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
        const listings = Array.from(document.querySelectorAll('#search-results-page-1 > ol > li')).slice(1, 11);

        listings.forEach((listing) => {
            const titleElement = listing.querySelector('.cl-app-anchor.text-only .label');
            const priceElement = listing.querySelector('.priceinfo');
            const imageElement = listing.querySelector('img');
            const linkElement = listing.querySelector('.cl-app-anchor.text-only');

            const title = titleElement ? titleElement.innerText.trim() : null;
            const price = priceElement ? priceElement.innerText.trim() : null;
            const imageUrl = imageElement ? imageElement.src : null;
            const link = linkElement ? linkElement.href : null;

            results.push({ title, price, imageUrl, link });
        });

        return results;
    });

    await fs.writeFile('craig.json', JSON.stringify(items, null, 2));

    console.log('Items extracted and saved to items.json');
    await browser.close();
    res.send(items)
})

// async function getInfo() {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto('https://newyork.craigslist.org/search/sss?query=nintendo');
  
//     const scrollDown = async () => {
//       await page.evaluate(() => {
//         window.scrollBy(0, window.innerHeight);
//       });
//     };
  
//     for (let i = 0; i < 12; i++) {
//       await scrollDown();
//       await page.waitForTimeout(100);
//     }
  
//     const items = await page.evaluate(() => {
//       const results = [];
//       const listings = Array.from(document.querySelectorAll('#search-results-page-1 > ol > li')).slice(0, 11);
  
//       listings.forEach((listing) => {
//         const titleElement = listing.querySelector('.cl-app-anchor.text-only .label');
//         const priceElement = listing.querySelector('.priceinfo'); 
//         const imageElement = listing.querySelector('img');
//         const linkElement = listing.querySelector('.cl-app-anchor.text-only');
  
//         const title = titleElement ? titleElement.innerText.trim() : null;
//         const price = priceElement ? priceElement.innerText.trim() : null;
//         const imageUrl = imageElement ? imageElement.src : null;
//         const link = linkElement ? linkElement.href : null;
  
//         results.push({ title, price, imageUrl, link });
//       });
  
//       return results;
//     });
  
//     await fs.writeFile('craig.json', JSON.stringify(items, null, 2));
  
//     console.log('Items extracted and saved to items.json');
//     await browser.close();
//   }


module.exports = router;