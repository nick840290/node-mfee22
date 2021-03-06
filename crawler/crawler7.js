const { readFile } = require("fs/promises");
const moment = require("moment");
const mysql = require("mysql2");
require("dotenv").config();
const twse = require("./utils/twse");
const converter = require("./utils/converter");
const twseSaver = require("./utils/twseSaver");


(async () => {
  let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  try {
    // 根據變數去抓取資料
    // 從 stock.txt 中讀出檔案代碼
    let stockNo = await readFile("stock.txt", "utf-8");
    // 抓取股票中文名稱，順便確認股票代碼是否存在
    let stockNameData = await twse.queryStockName(stockNo);

    console.log(stockNameData);
    let stockName = converter.parseStockName(stockNameData);

    // 儲存股票代碼與名稱進資料庫
    // Using prepared statements
    // to protect from SQL Injection attacks
    let saveNameResult = await connection.execute(
      "INSERT IGNORE INTO stocks (id, name) VALUES (?, ?)",
      [stockNo, stockName]
    );
    // console.log(saveNameResult);

    let queryDate = moment().format("YYYYMMDD"); // 自動用今天的日期

    let priceData = await twse.queryStockPrice(stockNo, queryDate);
    // priceData ==> response.data

    // 開始處理資料
    let processData = converter.convertPrice(priceData, stockNo);
    console.log(processData);

    // 把整理好的資料存進資料庫
    // connection.execute -> 處理 bulk insert 的 prepare statement 會有點小問題
    // --> 回傳的是 promise 可以被 await
    // connection.query
    // 回傳的不是 promise，不能被 await
    let savePriceResult = await connection
      .promise()
      .query(
        "INSERT IGNORE INTO stock_prices (stock_id, date, volume, amount, open_price, high_price, low_price, close_price, delta_price, transactions) VALUES ?",
        [processData]
      );
    console.log(savePriceResult);
  } catch (e) {
    console.error(e);
  }
  connection.end();
})();