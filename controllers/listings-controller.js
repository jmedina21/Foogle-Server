const puppeteer = require('puppeteer')

const getCraigslist = (async (req, res) => {

    const {search} = req.query
    const browser = await puppeteer.launch({
      executablePath: process.env.NODE_ENV === 'production'
      ? process.env.PUPPETEER_EXECUTABLE_PATH
      : puppeteer.executablePath(),
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = (await browser.pages())[0];
    await page.goto(`https://newyork.craigslist.org/search/sss?query=${search}`);

    const scrollDown = async () => {
        await page.evaluate(() => {
            window.scrollBy(0, window.innerHeight);
        });
    };

    for (let i = 0; i < 40; i++) {
      await scrollDown();
      await new Promise(resolve => setTimeout(resolve, 50));
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

    await browser.close();
    res.status(200).json(items)
})

const getEbay = (async (req, res) => {

    const {search} = req.query
    const browser = await puppeteer.launch({
      executablePath: process.env.NODE_ENV === 'production'
      ? process.env.PUPPETEER_EXECUTABLE_PATH
      : puppeteer.executablePath(),
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = (await browser.pages())[0];
    await page.goto(`https://www.ebay.com/sch/i.html?_from=R40&_trksid=p4432023.m570.l1313&_nkw=${search}&_sacat=0`);
  
    const scrollDown = async () => {
      await page.evaluate(() => {
        window.scrollBy(0, window.innerHeight);
      });
    };
  
    for (let i = 0; i < 10; i++) {
      await scrollDown();
      new Promise((resolve) => setTimeout(resolve, 10));
    }
  
    const items = await page.evaluate(() => {
      const results = [];
      const listings = Array.from(document.querySelectorAll('div.s-item__wrapper.clearfix'));
  
      listings.forEach((listing, index) => {
        if (index === 0) {
          return;
        }
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
  
    await browser.close();
    res.status(200).json(items)
  })
  
  const getFacebook = (async (req, res) => {
    const {search} = req.query
    const browser = await puppeteer.launch({
      executablePath: process.env.NODE_ENV === 'production'
      ? process.env.PUPPETEER_EXECUTABLE_PATH
      : puppeteer.executablePath(),
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = (await browser.pages())[0];
    await page.goto(`https://www.facebook.com/marketplace/nyc/search/?query=${search}`);

    if(page.url().includes('facebook.com/login')){
      await page.type('#email', process.env.fbEmail);
      await page.type('#pass', process.env.fbPassword);
      await page.click('#loginbutton');   
      await page.waitForNavigation();
    }

    const scrollDown = async () => {
        await page.evaluate(() => {
            window.scrollBy(0, window.innerHeight);
        });
    };

    for (let i = 0; i < 12; i++) {
        await scrollDown();
        new Promise((resolve) => setTimeout(resolve, 50));
    }

    const items = await page.evaluate(() => {
        const results = [];
        const listings = Array.from(document.querySelectorAll('div[style="max-width:381px;min-width:242px"]'));
      
        listings.forEach((listing) => {
          const titleElement = listing.querySelector('span[style*="-webkit-box-orient:vertical;"]');
          let priceElements = [...document.querySelectorAll('span[dir="auto"]')];
          let priceElement = priceElements.find(span => span.textContent.includes("$"));
          const imageElement = listing.querySelector('img[referrerpolicy="origin-when-cross-origin"]');
          const linkElement = listing.querySelector('a[role="link"]');
          const locationElement = listing.querySelector('span.x1lliihq.x6ikm8r.x10wlt62.x1n2onr6.xlyipyv.xuxw1ft');

          const title = titleElement ? titleElement.innerText.trim() : null;
          const price = priceElement ? priceElement.innerText.trim().split(' ')[0] : null;
          const imageUrl = imageElement ? imageElement.src : null;
          const link = linkElement ? linkElement.href : null;
          const location = locationElement ? locationElement.innerText.trim() : null;
      
          if(title !== null){
            results.push({ title, price, imageUrl, link, location });
          }
        });
      
        return results;
      });      
    await browser.close();
    res.status(200).json(items)
})

module.exports = {
    getCraigslist,
    getEbay,
    getFacebook
};
