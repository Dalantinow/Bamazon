drop database if exists bamazon;
create database bamazon;
use bamazon;

create table products(
item_id int not null auto_increment,
product_name varchar(30) null,
department_name varchar(30) null,
price decimal(10, 4) null,
stock_quantity int null,
primary key (item_id)
);

insert into products(product_name, department_name, price, stock_quantity)
values("Apple Macbook Pro", "Electronics", 999.99, 100), 
("cast iron frying pan", "Home and Kitchen", 19.99, 50), 
("Apple Airpods", "Electronics", 159.99, 1000),
("chef's knife", "Home and Kitchen", 40.99, 100),
("Nike Killshot 2 sneakers", "Apparel", 90.00, 40),
("Patagonia Torrentshell Jacket", "Apparel", 129.00, 80),
("office chair", "Home and Kitchen", 140.90, 15),
("Samsung Galaxy S10", "Electronics",  749.99, 35),
("Ray Ban Wayfarers", "Apparel", 130, 60),
("Dyson Bladeless Fan", "Home and Kitchen", 159.99, 20);

select * from products
