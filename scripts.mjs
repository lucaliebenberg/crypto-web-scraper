import puppeteer from "puppeteer";
import fs from "fs";

// const EMAIL = "<YOUR EMAIL>";
// const PASSWORD = "<YOUR PASSWORD>";

const SELECTORS = {
  bitcoin: ".sc-aef7b723-0.LCOyB",
  favorite: ".sc-44910c32-0.ljDIwE.sc-126cfa71-0.haLigd",
  password: '[data-testid="current-password"]',
  submit: '[data-testid="submit"]',
  filters: '[alt="filters"]',
  images: ".avatar.avatar--large.avatar--person:not(.avatar--noPhoto) img",
};

const init = async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });

  const page = await browser.newPage();
  await page.goto("https://coinmarketcap.com/");

  const waitTime = () =>
    new Promise((resolve) => {
      page.mouse.wheel({ deltaY: 300 });
      setTimeout(resolve, 200);
    });

  // mouse Y scroll
  waitTime();

  await page.waitForSelector(SELECTORS.bitcoin);
  await page.click(SELECTORS.bitcoin);

  // mouse Y scroll on details page
  waitTime();

  //   await page.waitForSelector(SELECTORS.email);
  //   await page.type(SELECTORS.email, EMAIL);
  //   await page.type(SELECTORS.password, PASSWORD);
  //   await page.click(SELECTORS.submit);

  await page.goto("https://coinmarketcap.com/currencies/bitcoin/markets/");

  await page.waitForSelector(SELECTORS.favorite);
  await page.click(SELECTORS.favorite);

  //   await page.waitForSelector(SELECTORS.images);

  // handle load more states
  //   const handleLoadMore = async () => {
  //     try {
  //       await page.$(".infiniteScrollLoadMoreButton");
  //       await page.click(".infiniteScrollLoadMoreButton");
  //     } catch (err) {}
  //   };

  //   let count = 0;

  //   const wait = async () => {
  //     count += 1;
  //     await waitTime();
  //     await handleLoadMore();

  //     if (count < 30) await wait();
  //   };

  //   await wait();

  // //   make use of eval()
  //   const response = await page.evaluate(() => {
  //     const nodes = document.querySelectorAll(
  //       ".avatar.avatar--large.avatar--person:not(.avatar--noPhoto) img"
  //     );

  //     return Array.from(nodes).map((node) => node.src);
  //   });

  // //   create a .json file with the data
  //   fs.writeFileSync(
  //     "./results.json",
  //     JSON.stringify({ members: result }, null, 2)
  //   );

  page.close();
};

init();
