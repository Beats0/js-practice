//使用sieve算法，返回一个小于n的最大素数
function steve(n) {
    var a = new Int8Array(n + 1);           //如果想是合数，则a[x]=1
    var max = Math.floor(Math.sqrt(n));     //因数不能比他大
    var p = 2;                              //2是第一个素数
    while (p < max) {
        for (var i = 2 * p; i <= n; i += p) //将p的倍数都标记为合数
            a[i] = 1;
        while (a[++p]) ;                    //下一个未标记的索引值是函数
        /*empty*/
    }
    while (a[n]) n--;                       //反向循环找到最大的素数
    return n;                               //返回n
}
