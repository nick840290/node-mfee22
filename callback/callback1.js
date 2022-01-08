var delay = function(e){
    return new Promise(function(doWork){
     setTimeout(doWork,e); 
    });
  };
  
  delay(2000).then(function(){
    console.log("刷牙");     
    return delay(2000); // 延遲2秒
  }).then(function(){
    console.log("吃早餐");     
    return delay(3000); // 延遲3秒
  }).then(function(){
    console.log("寫功課");    
  });