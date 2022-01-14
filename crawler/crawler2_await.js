const axios = require('axios');

(async ()=>{
  try{
    const response = await axios.get('https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=20220114&stockNo=2615&_=1642165084354');
  console.log(response.data);
  }catch(error){
    console.log(error);
  }
})();