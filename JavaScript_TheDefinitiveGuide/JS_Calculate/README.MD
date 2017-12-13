Table
```html
<table>
    <tr>
        <th>输入贷款数据</th>
        <td></td>
        <th>Loan Balance ,Cumulative Equity,and Interest Payments</th>
    </tr>
    <tr>
        <td>贷款贷款</td>
        <td><input onchange="calculate();" id="amount"/></td>
        <td rowspan="8">
            <canvas id="graph" width="400px" height="250px"></canvas>
        </td>
    </tr>
    <tr>
        <td>年利</td>
        <td><input id="apr" onchange="calculate();"/></td>
    </tr>
    <tr>
        <td>还款期</td>
        <td><input id="years" onchange="calculate();"/></td>
    </tr>
    <tr>
        <td>邮政编码</td>
        <td><input id="zipcode" onchange="calculate();"/></td>
    </tr>
    <tr>
        <th>批准付款</th>
        <td>
            <button onclick="calculate();">批准</button>
        </td>
    </tr>
    <tr>
        <td>每月支付</td>
        <td>$<span class="output" id="payment"></span></td>
    </tr>
    <tr>
        <td>总付款</td>
        <td>$<span class="output" id="total"></span></td>
    </tr>
    <tr>
        <td>总利息</td>
        <td>$<span class="output" id="totalinterest"></span></td>
    </tr>
    <tr>
        <th>sponsors</th>
        <td colspan="2">Apply for your loan with one of these fine lenders
            <div id="lenders"></div>
        </td>
    </tr>
</table>
```
JS
```js
function calculate() {
    //引入变量
    var amount = document.getElementById("amount");//贷款贷款
    var apr = document.getElementById("apr");//年利
    var years = document.getElementById("years");//还款期
    var zipcode = document.getElementById("zipcode");//邮政编码
    var payment = document.getElementById("payment");//每月支付
    var total = document.getElementById("total");//总付款
    var totalinterest = document.getElementById("totalinterest");//总利息


    var principal = parseFloat(amount.value);
    //将百分比转换成小数格式，并从年利率转换成月利率
    var interest = parseFloat(apr.value) / 100 / 12;
    //将年度赔付转换成月度赔付
    var payments = parseFloat(years.value) * 12;

    //计算月赔付数据
    var x = Math.pow(1 + interest, payments);
    var monthly = (principal * x * interest);

    if (isFinite(monthly)) {
        payment.innerHTML = monthly.toFixed(2);//精确到小数点后两位
        total.innerHTML = (monthly * payments).toFixed(2);
        totalinterest.innerHTML = ((monthly * payments) - principal).toFixed(2);
        save(amount.value, apr.value, years.value, zipcode.value);
        try {
            getLenders(amount.value, apr.value, years.value, zipcode.value);
        } catch (e) {

        }
        chart(principal, interest, monthly, payments);
    } else {
        payment.innerHTML = "";
        total.innerHTML = "";
        totalinterest.innerHTML = "";
        chart();
    }

    function save(amount, apr, years, zipcode) {
        if (window.localStorage) {
            localStorage.loan_amount = amount;
            localStorage.loan_apr = apr;
            localStorage.loan_years = years;
            localStorage.loan_zipcode = zipcode;
        }
    }

    window.onload = function () {
        if (window.localStorage && localStorage.loan_amout) {
            document.getElementById("amount").value = localStorage.loan_amount;
            document.getElementById("apr").value = localStorage.loan_apr;
            document.getElementById("years").value = localStorage.loan_years;
            document.getElementById("zipcode").value = localStorage.loan_zipcode;
        }
    };

    //返回一个贷款人的链接列表
    function getLenders(amount, apr, years, zipcode) {
        //如果浏览器不支持xmlhttprequest对象，则退出
        if (!window.XMLHttpRequest) {
            return;
        }
        var ad = document.getElementById("lenders");
        if (!ad) {//如果值为空，则退出
            console.info("值为空");
            return;
        }

        var url = "getLenders.php" + "?amt=" + encodeURIComponent(amount) + "&apr"//处理数据的url地址
            + encodeURIComponent(apr) + "&yrs" + encodeURIComponent(years) +//使用查询串中的数据
            "&zip" + encodeURIComponent(zipcode);

        var req = new XMLHttpRequest();//发起一个请求
        req.open("GET", url);
        req.send(null);

        req.onreadystatechange = function () {
            if (req.readyState == 4 && req.status == 200) {
                var response = req.responseText;//HTTP响应是以字符串的形式呈现的
                var lenders = JSON.parse(response);//将其解析成js数组

                var list = "";
                for (var i = 0; i < lenders.length; i++) {
                    list += "<li><a href='" + lenders[i].url + "'>" + lenders[i].name + "</a>";
                }
                ad.innerHTML = "<ul>" + list + "</ul>";
            }
        }
    }

    function chart(principal, interest, monthly, payments) {
        var graph = document.getElementById("graph");
        graph.width = graph.width;
        if (arguments.length == 0 && !graph.getContext) {
            //如果不传入参数，或是浏览器不支持画布，则直接返回
            return;
        }

        var g = graph.getContext("2d");
        var width = graph.width;
        var height = graph.height;

        function paymentsTox(n) {//将付款数字和美元数据转换为像素
            return n * width / payments;
        }

        function amountToy(a) {
            return height - (a * height / (monthly * payments * 1.05));
        }

        g.moveTo(paymentsTox(0), amountToy(0));
        g.lineTo(paymentsTox(payments), amountToy(monthly * payments));
        g.lineTo(paymentsTox(payments), amountToy(0));
        g.closePath();
        g.fillStyle = "#f88";
        g.fill();
        g.font = "bold 12px sans-serif";
        g.fillText("Total Interest Payments", 20, 20);

        var equity = 0;
        g.beginPath();
        g.moveTo(paymentsTox(0), amountToy(0));
        for (var p = 1; p <= payments; p++) {
            var thisMonthsInterest = (principal - equity) * interest;
            equity += (monthly - thisMonthsInterest);
            g.lineTo(paymentsTox(p), amountToy(equity));
        }
        g.lineTo(paymentsTox(payments), amountToy(0));
        g.closePath();
        g.fillStyle = "green";
        g.fill();
        g.fillText("Total Equity", 20, 35);

        var bal = principal;
        g.beginPath();
        g.moveTo(paymentsTox(0), amountToy(bal));
        for (var p = 1; p <= payments; p++) {
            var thisSecondeMothsInterest = bal * interest;
            bal -= (monthly - thisSecondeMothsInterest);
            g.lineTo(paymentsTox(p), amountToy(bal));
        }
        g.lineWidth = 3;
        g.stroke();
        g.fillStyle = "block";
        g.fillText("Loan Balance", 20, 50);

        g.textAlign = "center";
        var y = amountToy(0);
        for (var year = 1; y * 12 <= payments; y++) {
            var x = paymentsTox(year * 12);
            g.fillRect(x - 0.5, y - 3, 1, 3);
            if (year == 1) {
                g.fillText("year", x, y - 5);
            }
            if (year % 5 == 0 && year * 12 !== payments) {
                g.fillText(String(year), x, y - 5);
            }
        }
        g.textAlign = "right";
        g.textBaseline = "middle";
        var ticks = [monthly * payments, principal];
        var rightEdge = paymentsTox(payments);
        for (var i = 0; i < ticks.length; i++) {
            var y = amountToy(ticks[i]);
            g.fillRect(rightEdge - 3, y - 0.5, 3, 1);
            g.fillText(String(ticks[i].toFixed(0)), rightEdge - 5, y);
        }
    }
}
```
##### [Demo](https://beats0.github.io/js-practice/JavaScript_TheDefinitiveGuide/JS_Calculate/)