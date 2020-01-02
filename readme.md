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
   `npm i express mysql2 body-parser jsonwebtoken bcryptjs dotenv multer`
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

## Default user 
```
default password is admin

admin (as admin)
mcdonald (as restaurant)
pizza (as restaurant)
bensu (as restaurant)
hokben (as restaurant)
janjijiwa (as restaurant)
user (as user)
```

## End Point
**. GUEST**
* `/`
* `/search/`
    * ``` {query, name:byname, price:1000, rating:(1-5)  } ```
* `/sort/`
    * ``` {query, name[]:asc/dsc, rating[]:, price[]:, rating[]:, update_on[]: } ```
* `/page/`
    * ``` {xform, page:1, limits:5/10 } ```

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
* **. Restaurant CRUD**
* `/resto/foto/{id_restaurant}/` put
   * ``` {image: yourfilefoto.jpg} ```

* `/admin/resto/` post
    * ``` {xform, name:restoname, user_id:id_user_to_resto, description:, longtitude:, latitude:,} ```

* `/admin/resto/{id_restaurant}` put
    * ``` {xform, name:restoname, user_id:id_user_to_resto, description:, longtitude:, latitude:,} ```

* `/admin/resto/{id_restaurant}` delete
* `/admin/resto/` get
* **. User CRUD**
* `/admin/user/` post
    * ``` {xform, username:admin, password:admin} ```
* `/admin/user/{id_user}` put
    * ``` {xform, username:admin, role_id:1/2/3} ```
* `/admin/delete/{id_user}` delete
* `/admin/user/` get


**. Restaurant**
**. Bearer token || role_id:2 in header**
* **. Items CRUD**
* `/restaurant/item/foto/{id_items}/` put
   * ``` {image: yourfilefoto.jpg} ```

* `/restaurant/{resto_id}` post
    * ``` {xform, itemname:food, price:1000, desc:, category:1} ```
* `/restaurant/{item_id}` put
    * ``` {xform, itemname:food, price:1000, desc:, category:1} ```
* `/restaurant/{id_item}` delete
* `/restaurant/{resto_id}` get

**. Cart**
**. Bearer token || role_id:3 in header**
* **. Carts CRUD**
* `/carts/{id_user}` post
    * ``` {xform, item_id:, item_quantity} ```
* `/carts/{id_carts}` put
    * ``` {xform, item_id:, item_quantity} ```
* `/carts/{id_carts}` delete
* `/carts/{id_user}` get
* **. Order Carts**
* `/carts/order/{id_carts}` put
* `/carts/order/feedback/{id_carts}` put
    * ``` {xform, rating:1-5, review:review_order} ```
* `/carts/order/{id_order}` get complete order
