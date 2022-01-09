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

async function main(){
    let dt = new Date();
    console.log(`Start ${dt.toISOString()}`);
    let result1 = await readFilePromise;
    console.log(`${result1}`);

    }

    main();



