"use strict";//开启ECMAScript5严格模式
function calculate() {
    var amount = document.getElementById("amount");
    var apr = document.getElementById("apr");
    var years = document.getElementById("years");
    var zipcode = document.getElementById("zipcode");
    var payment = document.getElementById("payment");
    var total = document.getElementById("total");
    var totalinterest = document.getElementById("totalinterest");
    //从input输入数据
    //将百分比转化为小数格式，从年利率转化为月利率
    //平均所赔率转化为月度赔率
    var principal = parseFloat(amount.value);
    var interest = parseFloat(apr.value)/100/12;
    var payments = parseFloat(years.value)*12;
    //计算月度赔锁数据
    var x = Math.pow(1+interest,payments);//幂运算
    var monthly = (principal * x * interest)/(x-1);

    if (isFinite(monthly)) {
        payment.innerHTML = monthly.toFixed(2);//四舍五入小数点后两位
        total.innerHTML = (monthly * payments).toFixed(2);
        totalinterest.innerHTML = ((monthly *payments) - principal).toFixed(2);
        //保存数据
        save (amount.value,apr.value,years.value,zipcode.value);
        //找到并展示，但忽略网络错误
        try {
            //捕获抛出异常
            getLenders(amount.value,apr.value,years.value,zipcode.value);
        }
        catch (e) { /*忽略异常*/ }
        //图表展示余额，利息，收益
        chart (principal,interest,monthly,payments);
    }
    else {
        //如果输入不合法
        //清空
        payment.innerHTML = "";
        total.innerHTML = "";
        totalinterest.innerHTML = "";
        chart();
    }

}