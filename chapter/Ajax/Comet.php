<?php
    $i=0;
    while(true) {
    //输出一些数据然后立刻刷新输出缓存
    echo "Number is $i";
    flush;

    //等待几秒
    sleep(10);

    $i++;
    }
?>