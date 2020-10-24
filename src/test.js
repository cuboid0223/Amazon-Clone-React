let basket = ["1","10000","2","3", "2", "1"];
// console.log(basket.findIndex((i) => i === "2"));
let index = basket.findIndex((i) => i === "2");// findIndex(func) 會找到第一個符合的結果
console.log(index);
if(index >= 0){// 如果有找到，沒找到會回傳 -1
    basket.splice(index, 1)//假設 index 是 2， 即刪除 index ＝ 2 ，1 次
    console.log(basket);
}else{
    console.log("I can't find!");
}