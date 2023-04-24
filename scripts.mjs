import puppeteer from "puppeteer";
import fs from "fs";

// const USERNAME = "<YOUR USERNAME>";
// const EMAIL = "<YOUR EMAIL>";
// const PASSWORD = "<YOUR PASSWORD>";

const SELECTORS = {
  bitcoin: ".sc-aef7b723-0.LCOyB",
  filter1:
    ".sc-44910c32-0.izpqHR.sc-f6f28484-1.rLduc.landed.ButtonSwitcher__Tab",
  filter2:
    ".sc-44910c32-0.izpqHR.sc-f6f28484-1.rLduc.landed.ButtonSwitcher__Tab",
  seemore: ".call-to-action",
  load: ".sc-54c323af-1.epVkWt",
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
  await waitTime();
  await waitTime();

  await page.waitForSelector(SELECTORS.bitcoin);
  await page.click(SELECTORS.bitcoin);
  await page.goto("https://coinmarketcap.com/currencies/bitcoin/markets/");

  // mouse Y scroll
  await waitTime();
  await waitTime();

  await page.goto(
    "https://coinmarketcap.com/currencies/bitcoin/historical-data/"
  );

  // mouse Y scroll
  await waitTime();
  await waitTime();

  await page.goto("https://coinmarketcap.com/currencies/bitcoin/news/");

  // mouse Y scroll
  await waitTime();
  await waitTime();
  await waitTime();

  //   make use of eval()
  const result = await page.evaluate(() => {
    const nodes = document.querySelectorAll(".sc-92becd6e-1.kqJeWC");

    return Array.from(nodes).map((node) => node.a);
  });

  //   create a .json file with the data
  fs.writeFileSync("./results.json", JSON.stringify({ news: result }, null, 2));

  page.close();
};

init();
