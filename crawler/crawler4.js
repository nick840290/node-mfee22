const axios = require("axios");

const { readFile } = require("fs/promises");


(async () => {
  try {

          let stockNo =  await readFile("stock.txt", "utf-8");;

          //今日日期
          var fullDate = new Date();
          var yyyy = fullDate.getFullYear();
          var MM = (fullDate.getMonth() + 1) >= 10 ? (fullDate.getMonth() + 1) : ("0" + (fullDate.getMonth() + 1));
          var dd = fullDate.getDate() < 10 ? ("0"+fullDate.getDate()) : fullDate.getDate();     
          let queryDate =  yyyy+MM+dd;

    let response = await axios.get(
      "https://www.twse.com.tw/exchangeReport/STOCK_DAY",
      {
        // 這裡可以放一些設定
        // params: 放 query string 的參數
        params: {
          response: "json",
          date: queryDate,
          stockNo,
        },
      }
    );

    console.log(response.data);
  } catch (e) {
    console.error(e);
  }
})();