const { readFile } = require("fs");

let readFilePromise = new Promise((resolve, reject) => {
  readFile("test.txt", "utf-8", (err, data) => {
    if (err) {
      reject(err);
      return;
    }
    resolve(data);
  });
});

readFilePromise
  .then((data) => {
    console.log(`這裡是test.txt的內容:${data}`);
  })
  .catch((err) => {
    console.log(`讀取錯誤, ${err}`);
  });
  
