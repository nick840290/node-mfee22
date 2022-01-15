// Promise 物件代表一個即將完成、或失敗的非同步操作，以及它所產生的值。

const { readFile } = require("fs/promises");

readFile("stock.txt", "utf-8")
  .then((result) => {
    console.log(`${result}`);
  })
  .catch((err) => {
    console.error(err);
  });