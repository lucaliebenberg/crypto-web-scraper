import puppeteer from "puppeteer";
import fs from "fs";

// const USERNAME = "<YOUR USERNAME>";
// const EMAIL = "<YOUR EMAIL>";
// const PASSWORD = "<YOUR PASSWORD>";

const SELECTORS = {
  bitcoin: ".sc-aef7b723-0.LCOyB",
  markets: ".sc-44910c32-0.izpqHR.sc-da999c6-0.iXEJbj.cmc-link",
  historical: ".sc-44910c32-0.izpqHR.sc-da999c6-0.iXEJbj.cmc-link",
  date: ".sc-44910c32-0.hxDdxF",
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
  await waitTime();
  await waitTime();

  await page.waitForSelector(SELECTORS.bitcoin);
  await page.click(SELECTORS.bitcoin);
  await page.goto("https://coinmarketcap.com/currencies/bitcoin/markets/");

  await page.waitForSelector(SELECTORS.markets);
  await page.click(SELECTORS.markets);

  await page.waitForSelector(SELECTORS.historical);
  await page.click(SELECTORS.historical);

  // mouse Y scroll
  await waitTime();
  await waitTime();

  // make use of eval()
  const response = await page.evaluate(() => {
    const nodes = document.querySelectorAll(
      ".sc-41086a84-2.kIfwNf.sc-beb003d5-3.cxLkYn.cmc-table  "
    );

    return Array.from(nodes).map((node) => node.table);
  });

  //   create a .json file with the data
  fs.writeFileSync("./results.json", JSON.stringify({ data: result }, null, 2));

  //   page.close();
};

init();
