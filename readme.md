<h1 align="center">FoodApp Delivery - ExpressJS</h1>



Foodapp is a food delivery application specially for backend only. Built with NodeJs using the ExpressJs Framework.
Express.js is a web application framework for Node.js. [More about Express](https://en.wikipedia.org/wiki/Express.js)
## Built With
[![Express.js](https://img.shields.io/badge/Express.js-4.x-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html)
[![Node.js](https://img.shields.io/badge/Node.js-v.10.16-green.svg?style=rounded-square)](https://nodejs.org/)

## Requirements
1. <a href="https://nodejs.org/en/download/">Node Js</a>
2. Node_modules
3. <a href="https://www.getpostman.com/">Postman</a>
4. Web Server (ex. localhost)
5. DBMS like phpmyadmin

## How to run the app ?
1. Open app's directory in CMD or Terminal
2. Type `npm install`
3. Download some package
   `npm init -y`
   `npm i express mysql2 body-parser jsonwebtoken bcryptjs dotenv`
4. Download nodemon for automatic checker
   `npm i -g nodemon`
5. Make new file a called **.env**, open in your favorite code editor and copy paste this code:
```
APP_PORT=8080
APP_URI=htpp://localhost:8080/
APP_KEY=santuy
DB_SERVER=localhost
DB_USER=root
DB_PASSWORD=
DB_DATABASE=foodapp
```
6. Turn on Web Server and MySQL can using Third-party tool like xampp, etc.
7. Create a database with the name foodapp, and Import file [foodappdata.sql](foodappdata.sql) to **phpmyadmin**
8. Open Postman desktop application or Chrome web app extension that has installed before
9. Choose HTTP Method and enter request url.(ex. localhost:8080/)
10. You can see all the end point [here](#end-point)

## File Structure
    .
    ├── ...
    ├── index.js                   # Unit tests
    ├── src                        
    |    ├── dbconfig.js           # Config database
    │    ├── middleware.js         # Middleware
    │    └── routes                # Route Of role id
    │          ├── admin.js        # Role for admin
    │          ├── restaurants.js  # Role for restaurant
    │          ├── carts.js        # Role for user when order an item       
    │          ├── user.js         # Login, logout and register user    
    │          └── guest.js        # All item get by guest 
    └── storage
         └── storage                
               └── image           # File for save image

   

## End Point
**. GUEST**
* `/`
* `/search/`
`by query ->
    name:name   -
    price:price -
    rating:1-5`
* `/sort/`
`by query ->
    name[]:asc/dsc - 
    price[]:    -
    rating[]:   -
    update_on[]:
`
* `/page/` 
`by query ->
    page:1 -
limits:limit items in page(5/10)
`

**. USER**
<!-- * `/note`
    * ``` { "title": "Party", "note": "Herman's Party at 19.00", "category": 1 } ``` -->

* `/user/register`
    * ``` {xform, username: yourname,password: yourpassword } ```

* `/user/login/` (get bearer token)
    * ``` {xform, username: yourname,password: yourpassword } ```
* `/user/logout/` (with bearer token)

**. ADMIN** 
**. Bearer token || role_id:1 in header**
* `/resto/foto/{id_restaurant}/` put
   * ``` {image: yourfilefoto.jpg} ```

`// admin create restaurant -------- post`
```* 
/admin/resto/
name:santuy
user_id: {id restaurant}
description: description
longtitude: longtitude
latitude:apa latitude
```

`// admin edit restaurant ------ put `
* /admin/resto/{id_restaurant}
name:santuy
user_id: {id restaurant}
description: description
longtitude: longtitude
latitude:apa latitude

// admin delete restaurant --------- delete
* /admin/resto/{id_restaurant}

// admin get restaurant ---------- get
* /admin/resto/

// Admin create user -------- post
* /admin/user/
username: admin
password: admin

// admin edit user ------------- put
* /admin/user/{id_user}
username: 
role_id: 1/ 2 /3

// admin delete user --------- delete
* /admin/user/{id_user}

// admin get user  ---------- get
* /admin/user/


**. Restaurant**
// Restaurant update item foto ------- put
* /restaurant/item/foto/{id_restaurant}
    image: yourfilefoto.jpg

// Restaurant create item ----------- post
* /restaurant/{your_restaurant_id}     
itemname:yourfoodname
price:price in number
description: desc item
category: your item category

// Restaurant edit item ----------- put
* /restaurant/{item_id}
itemname:yourfoodname
price:price in number
description: desc item
category: your item category

// Restaurant delete item --------- delete
* /restaurant/{item_id}

// Restaurant get item  ---------- get
* /restaurant/{your_restaurant_id}


**. Cart**

// User create cart ----------- post
* /carts/{id_user}
id_item: id of your item 
item_quantity: quantity of your item

// User edit cart ----------- put
* /carts/{id_of_cart}     
id_item: id of your item 
item_quantity: quantity of your item

// User delete cart ----------- delete
* /carts/{id_of_cart}

// User get cart  --------- get 
* /carts/{id_user}

// User order cart -------- put
* /carts/order/{id_of_cart}

// User give a rating and review -------- put
* /carts/order/feedback/{id_of_cart}
rating: rating of your item ordered (1-5)
review: review of your item ordered

// User get complete order ------ get
* /carts/order/{id_of_cart}
