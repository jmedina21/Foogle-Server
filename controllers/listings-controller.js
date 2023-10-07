const puppeteer = require('puppeteer')
const randomUserAgent = require('random-useragent');


const getCraigslist = (async (req, res) => {

    const {search} = req.query
    const browser = await puppeteer.launch({
      executablePath: process.env.NODE_ENV === 'production'
      ? process.env.PUPPETEER_EXECUTABLE_PATH
      : puppeteer.executablePath(),
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto(`https://newyork.craigslist.org/search/sss?query=${search}`);

    const scrollDown = async () => {
        await page.evaluate(() => {
            window.scrollBy(0, window.innerHeight);
        });
    };

    for (let i = 0; i < 40; i++) {
        await scrollDown();
        // new Promise((resolve) => setTimeout(resolve, 30));
        await page.waitForTimeout(50);


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
    const page = await browser.newPage();
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
    await page.goto(`https://www.facebook.com/marketplace/nyc/search/?query=${search}&exact=false`);

    if(page.url().includes('facebook.com/login')){
      await page.type('#email', process.env.fbEmail);
      await page.type('#pass', process.env.fbPassword);
    }

    await page.click('#loginbutton');   

    await page.waitForNavigation();
    console.log(page.url());

    const scrollDown = async () => {
        await page.evaluate(() => {
            window.scrollBy(0, window.innerHeight);
        });
    };

    for (let i = 0; i < 12; i++) {
        await scrollDown();
        new Promise((resolve) => setTimeout(resolve, 30));
        // await page.waitForTimeout(250);
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
      
          if(title !== null){
            results.push({ title, price, imageUrl, link, location });
          }
        });
      
        return results;
      });      
    await browser.close();
    res.status(200).json(items)
})

// const shfb = (async (req, res) => {
//   const {search} = req.query;

  
//   const browser = await puppeteer.launch({
//     executablePath: process.env.NODE_ENV === 'production'
//     ? process.env.PUPPETEER_EXECUTABLE_PATH
//     : puppeteer.executablePath(),
//     headless: 'new', 
//     args: ['--no-sandbox', '--disable-setuid-sandbox']
//   });
  
//   await page.setViewport({width: 1280, height: 800});
//   await page.goto(`https://www.facebook.com/marketplace/nyc/search/?query=${search}`
//   //  ,{ waitUntil: 'networkidle2' }
//   );
//   console.log(page.url());
//   const screenshot = await page.screenshot();
//   await browser.close();

//   res.setHeader('Content-Type', 'image/png');
//     res.send(screenshot);
// });

const shfb = async (req, res) => {
  const { search } = req.query;

  const browser = await puppeteer.launch({
      executablePath: process.env.NODE_ENV === 'production'
          ? process.env.PUPPETEER_EXECUTABLE_PATH
          : puppeteer.executablePath(),
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  await page.setRequestInterception(true);  // Enable request interception

  page.on('request', (request) => {
      const requestURL = request.url();

      console.log(`Request URL: ${requestURL}`);

      if (requestURL.includes('facebook.com/login')) {
          console.warn('Redirect detected. Aborting!');
          request.abort();
      } else {
          request.continue();
      }
  });

  page.on('response', async (response) => {
      const requestURL = response.request().url();
      const responseURL = response.url();
      const status = response.status();

      console.log(`Response URL: ${responseURL}`);
      console.log(`Status Code: ${status}`);

      if (requestURL !== responseURL) {
          console.warn('Possible redirect detected.');
          // Handle the redirect, e.g., abort, retry, log, etc.
      }
  });

  await page.setViewport({ width: 1280, height: 800 });

  try {
      await page.goto(`https://www.facebook.com/marketplace/nyc/search/?query=${search}`);
  } catch (error) {
      console.error('Navigation error:', error);
  }

  console.log(page.url());

  const screenshot = await page.screenshot();
  await browser.close();

  res.setHeader('Content-Type', 'image/png');
  res.send(screenshot);
};


const loginToFacebook = async (req,res) =>{
  const { search } = req.query;

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  await page.setViewport({width: 1280, height: 800});
  await page.goto(`https://www.facebook.com/marketplace/nyc/search/?query=${search}`);

  if(page.url().includes('facebook.com/login')){
    await page.type('#email', process.env.fbEmail);
    await page.type('#pass', process.env.fbPassword);
  }

  await page.click('#loginbutton'); 

  await page.waitForNavigation();
  console.log(page.url());
  const screenshot = await page.screenshot();
  await browser.close();

  res.setHeader('Content-Type', 'image/png');
  res.send(screenshot);

  await browser.close();
}

const goToSannySoft = async (req,res) =>{
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  await page.setViewport({width: 1280, height: 800});
  await page.goto(`https://bot.sannysoft.com/`);

  console.log(page.url());
  // const screenshot = await page.screenshot();
  const pdf = await page.pdf({path: 'hn.pdf', format: 'A4'});
  await browser.close();
  //download pdf of the page  
  res.setHeader('Content-Type', 'application/pdf');

  // res.setHeader('Content-Type', 'image/png');

  res.send(pdf);

  await browser.close();
}

module.exports = {
    getCraigslist,
    getEbay,
    getFacebook,
    shfb,
    loginToFacebook,
    goToSannySoft
};
