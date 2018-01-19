```sql
--创建create
create database test	--创建
on primary
(
name='dbtest',	--主数据逻辑名称
filename='E:\SQL\SQL works\dbtest.mdf',		--主数据物理名称
size=10MB,maxsize=UNLIMITED,filegrowth=10%
)
log on		--日志文件
(
name='dbtest_log',
filename='E:\SQL\SQL works\dbtest_log.log',		--日志数据名称
size=10MB,maxsize=500MB,filegrowth=10%
)

--插入编辑 insert
use test
--
Inser userInfo
(UserID,UserName,UserPwd)
values
(‘001’,’xxx’,’123’)

--数据修改 update
use xsgl
update xsgl
set 备注='默认备注'
--编辑指定列
set 备注
='备注2' where 学号>5
--编辑条件行，批量

--删除delete
delete xsgl where 学号>5
--删除5行后的数据

truncate table xsgl
--重置表

--查询select
--select 13*14
--select 'T0001'
use book
select distinct publisher as '出版社'
from book
--查询并更名

select *
from book
where price>=20
select *
from book
where pubdate>=2001-1-1


--匹配 %  _

--BOOK中查询匹配数据库
select Bookname, publisher
from BOOK
where Bookname like '数据库%'


--查询匹配字符数量

select COUNT(NAME)
from READER
where name like ('张%')

--多重查询

select *
from READER
where dept ='计算机系' and class=1


--升降序order by




--分组统计

select publisher, sum(qty)
from book
group by publisher


select name
from READER, BORROW
where READER.CARDID=BORROW.CARDID and SDATE is null




--查询书名相同而出版社不同的所有图书书名

select distinct B1.BOOKNAME
from BOOK B1, BOOK B2
where B1.BOOKNAME =B2.BOOKNAME and B1.publisher<>B2.publisher


--查询某某最大的值所在的相关信息

use book
select *
from book
where price = (select MAX(price)
from book)

或者使用any：

Select *
from SC
Where 选课人数=any(
Select max(选课人数)
from SC
)

--查询重命名与未还书的人
use book
select name
from reader r , borrow b
where r.cardid=b.cardid and sdate is null

--查询书名相同而出版社不同的（去掉重复项）
use book
select distinct b1.bookname
from book b1, book b2
where b1.bookname=b2.bookname
    and b1.publisher<>b2.publisher
bookname
1	数据结构


--查询
use book
select a.cardid, name , sex, dept, class, bookid, bdate, sdate
from reader a full outer join borrow b
    on a.cardid=b.cardid

--多重嵌套查询

--查询借了《数据库系统》书籍的所有读者的姓名
--书籍名称->ID->读者卡号->读者姓名
select name
from reader
where cardid in
(select cardid
from borrow
where bookid in
(
select bookid
from book
where bookname = '数据库系统'
)
)

--多重any嵌套所在信息查询
select name
from reader
where cardid=any(
select cardid
from borrow
where sdate is null and bookid=any(
select bookid
    from book
    where publisher = '哈尔滨工业大学出版社'
)
)
Name
1	张勇

-- 借阅Tp200图书的所有读者姓名exists返回值
select name
from reader
where exists(
select *
from borrow
where borrow.cardid=reader.CARDID and bookid='TP2003-002'
)


-- 查询所有借阅图书包含（union）
use book
    select bookid, COUNT(cardid) num
    from borrow
    where sdate is null
    group by bookid
union
    select bookid, 0 num
    from book
    where bookid not in(select bookid
    from borrow
    where sdate is null)


-- 数据更新

--插入 insert
use book
create table BOOKQTY
(
    bookid char(20),
    QTY int
)
go
insert into BOOKQTY
select bookid, count(*)
from borrow
where sdate is null
group by bookid

--修改 set where
update borrow
set sdate=GETDATE()
where bookid='TP2003-002' and cardid ='T0001'
go
update book
set QTY=QTY-1
where bookid='TP2004-005'


--删除 where delete


-- 数据控制

--权限





角色授权
use book
grant select,update on book to jyl

将book表中的select权限给所有用户
use book
grant select on book to public

第五章 存储过程及触发器
查询数据结构

exec sp_helpdb

加密
With encryption
As


局部变量
声明：需要使用DELAER
DELAER{
@varaible_name datatype[…n]
}

建立存储
use book
go
create proc hello
as
print 'hello'
exec hello


-- 提条件参数的
use xsgl
go
create proc my_xi
    @系名 varchar(255)
as
select *
from xs
where 系名=@系名
exec my_xi @系名='信息'
@系名='信息'为参数




查询单个
use xsgl
go
create proc stu_cj2
    @name char(10),
    @cname char(16)='C语言程序设计'
as
select a.学号, 姓名, b.课程名称, c.成绩
from xs a, kcxx b, cj c
where a.学号=c.学号 and c.课程编号=b.课程编号 and a.姓名=@name and b.课程名称=@cname
go

exec stu_cj2 王红,数据结构

创建一个存储过用于计算学生各科成绩的总分
，使用了一个输入参数和输出参数
use xsgl
go
create procedure stu_sum
    @name char(10),
    @total int output
as
select @total=sum(成绩)
from xs, cj
where xs.姓名=@name and xs.学号=cj.学号
group by xs.学号
go
exec stu_sum 刘林


查询王红
declare @total1 int
exec stu_sum @name='王红',
@total =@total1 output
print @total1


编写一个存储过程inser_stu 在插入学生数据前先判断学号是否存在，如果存在就输出“输入学号已存在”，否则插入该学生数据并返回“数据插入成功”
create proc inser_stu
    @sid char(6),
    @sname char(8),
    @ssex char(2),
    @sxm char(10),
    @sbrith smalldatetime,
    @smz char(4),
    @szxf int
as
if exists(select *
from xs
where 学号=@sid)
print ('输入学号已存在')
else
insert into xs
    (学号,姓名,性别,系名,出生日期,民族,总学分)
values
    (@sid, @sname, @ssex, @sxm, @sbrith, @smz, @szxf)
print ('数据插入成功')
--执行
use xsgl
go
exec inser_stu
@sid='9999',@sname='周克强',@ssex='男',@sxm='信息管理与技术',@sbrith='1995/1/13',@smz='汉',@szxf='50'


sp_helptext
inser_stu			--定义
sp_help inser_stu			--参数
sp_depends inser_stu
--依赖信息
with encryption			--加密


触发器
Insert插入 ：创建一个触发器，向cj表中插入一条记录时，检查该条的学号是否在xs表中存在，若有一行为否，检查该记录不允许插入
use xsgl
go

create trigger checktrig
on cj
for insert
as
if exists (select *
from inserted a
where a.学号 not in (select b.学号
    from xs.b)
    or a.课程编号 not in (select c.课程编号
    from kcxx.c)
)
begin
    raiserror('违背数据的一致性',16,1)
    rollback transaction
end
go


Update更新回滚
-- 创建一个触发器，向cj表中更新记录时，给出提示信息，并取消修改操作
use xsgl
go

create trigger update_trigger
on cj
for update
as
if update(学号) or UPDATE(课程编号)
begin
    raiserror('学号或课程编号不能修改',16,1)
    rollback transaction
end
go


Delete删除
-- 当从xs表中删除一个学生记录时，相应的从cj表中删除该学生对应的所有记录
use xsgl
go

create trigger delete_trigger
on xs
after delete
as
delete from cj
where 学号=(select 学号
from deleted)
go


创建视图



-- 当向ci表中添加某学生成绩时，判断如果成绩大于60，就将该课程的学分值累加到该学生的总分值上，使用触发器
use xsgl
go

create trigger update_总学分
on cj
for insert
as
declare@xf int,@cj numeric,@kchchar(4),@xh char(10)
set@cj=(select 成绩
from inserted)
set@kch=(select 课程号
from inserted)
set@xh-(select 学号
from inserted)
set@xf=(select 学分
from kc
where 课程号=@kch)
if @cj>=60begin
    update xs set 总学分=总学分+@xf where 学分=@xh
end
go

DDL触发器


删除保护
use xsgl
go

create trigger 删除保护
on database
for drop_table
as
begin
    raiserror('对不起，xsgl数据库中的表不能删除',16,10)
    rollback transaction
end

保护所有数据库

create trigger 删除保护所有库
on all server
for drop_database
as
print'对不起，xsgl数据库中的表不能删除'
rollback
是否启用触发器

全部启用：
enable trigger all on cj
go
全部禁用
：
disable trigger all on cj


--创建成绩表
use xsgl
go
create view xscj_view
as
    select a.学号, a.姓名, b.课程编号, c.课程名称, b.成绩
    from xs a, cj b, kcxx c
    where   a.学号=b.学号 and c.课程编号=b.课程编号
go

--创建平均成绩表
use xsgl
go
create view avg_view
as
    select 学号, 姓名, avg(成绩) as 平均成绩
    from xscj_view
    group by 学号,姓名

--执行
select *
from avg_view
select *
from avg_view
where 姓名='王红'


自定义函数


use xsgl
go
create function abgrage(@num char(6))
returns int--返回值
as
begin
    declare @aver int--定义局部变量
    select @aver=AVG(成绩)
    from cj
    where 学号=@num
    return @aver
end
go

/*调用*/
select dbo.abgrage('200506')

内嵌表函数

create function kskmcj(@xh as char(10))
returns table
as
return (select a.学号 , a.姓名, a.系名, b.课程名称, c.成绩
from xs a, kcxx b, cj c
where a.学号 =c.学号 and b.课程编号=c.课程编号 and a.学号=@xh)
go
--select* from dbo.kskmcj('200503')



第七章 约束


--use xsgl
--go
--create table ke
--(
--课程号 char(6) constraint ke_PK PRIMARY KEY,
--课程名称 char(16) not null,
--学分 smallint,
--学时数 smallint
--)

--exec sp_help cj
alter table cj
add constraint cj_pk primary key (学号,课程编号)
go

use xsgl
go
alter table xs
add 电话 char(8) null
insert xs
    (学号,姓名,性别,出生日期,系名,总学分,电话)
values
    ('201310', '王五', '女', '95/6/13', '电子', '18', '450131100')
go

use xsgl
-- 创建不检查现有数据的检查约束
go
alter table xs
with nocheck
add constraint ck_dh
check ([电话]like '[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]')
go

-- 删除约束
alter table xs
drop constraint ck_dh

-- 默认约束
use xsgl
go
alter table xs
add constraint df_zy default '女' for 性别

-- 删除约束
alter table xs
drop constraint df_xsda_性别

-- 外键约束
-- Cj表中的学号为外键，主键为xs表中的学号，课程号为外键，主键为kc表中的课程号
use xsgl
go
alter table cj
add constraint fk_cj_xs foreign key (学号)
references xs(学号)
go
alter table cj
add constraint fk_cj_kc foreign key (课程编号)
references kcxx (课程编号)
go
-- 默认值（针对多个列）

use xsgl
go
create default df_学时数 as 60
go

-- 默认值绑定
use xsgl
go
exec sp_bindefault 'df_学时数','ke.学时数'
go

-- 默认值解绑
use xsgl
go
exec sp_unbindefault 'ke.学时数'
go


删除绑定
use xsgl
go
exec sp_unbindefault 'ke.学时数'
go
drop default df_学时数
go

规则
-- 创建并绑定规则
use xsgl
go
create rule 总学分 as @score>=0 and @score <=100
go
exec sp_bindrule 'dbo.总学分','ke.学分'
go

聚集索引





-- 游标
-- 游标的打开
declare rs insensitive cursor for select *
from xs
open rs
if @@error=0
begin
    print '游标打开成功'
    print '学生总数为:'+..
convert
    (varchar
    (3),@@cursor_rows)
end
close rs
deallocate rs
go



-- 创建并调用(一条一条执行)
use xsgl
go
declare rs cursor for select *
from xs
open rs

/*fetch next from rs*/

close rs
deallocate rs/*释放游标*/
go



-- 使用游标更新xs1将系名修改为网络
use xsgl
go
select *
into xs1
from xs
declare xgzy cursor for select *
from xs1
where 系名='信息'
open xgzy
fetch next from xgzy
fetch next from xgzy
update xs1 set 系名='网络' where current of xgzy
close xgzy
deallocate xgzy
select *
from xs1
where  系名='网络'


-- Scroll前进或后退
declare xgzy cursor scroll for select *
from xs1
where 系名='信息'
open xgzy
fetch next from xgzy
```