const { readFile } = require("fs");

readFile("test.txt", "utf-8")
  .then((result) => {
    console.log(`這是內建的 promise 版本 ${result}`);
  })
  .catch((err) => {
    console.error(err);
  });

async function main(){
    let dt = new Date();
    console.log(`Start ${dt.toISOString()}`);
    let result1 = await readFilePromise;
    console.log(`${result1}`);
    }

    main();



