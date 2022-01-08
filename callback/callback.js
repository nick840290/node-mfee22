let doWork = function (job, timer, callback){

//callback設計上
//通常第一個參數會是錯誤
// 第二個會是結果

setTimeout(() => {

callback(null,`完成工作 ${job}`);
}, timer);

};


doWork("刷牙", 2000, (err, result) => {
    console.log(result);
})

doWork("吃早餐", 3000, (err, result) => {
    console.log(result);
})

doWork("寫功課", 2000, (err, result) => {
    console.log(result);
})