# Bulk Purchase App

> DASS Assignment 2 - Kishan Sairam Adapa 2018101026

## Deployment Details

- Frontend deployed at https://web.iiit.ac.in/~kishan.sairam/
- Used mongo atlas for cloud database 
- Heroku for node js backend server deployment

## Instructions

- Requires instance of mongodb running on `127.0.0.1:27017`
- To run both frontend & backend
  - Go to respective directory, install npm dependencies using `npm install`
  - Run using `npm start`
- React runs on `localhost:3000` when port is free by default
- Express server runs on `localhost:5000` by default. 
  - Unless port environment variable is set. 
  - For local run, make sure port environment variable is 5000 since react has it hardcoded to 5000
- All the requirements mentioned in assignment PDF are implemented

## Directory Structure

```
.
├── backend
│   ├── Procfile
│   ├── app.js
│   ├── models
│   │   ├── order.js
│   │   ├── product.js
│   │   └── user.js
│   ├── package-lock.json
│   ├── package.json
│   └── routes
│       ├── auth.js
│       ├── manage.js
│       └── view.js
└── frontend
    ├── README.md
    ├── package-lock.json
    ├── package.json
    ├── public
    │   ├── favicon.ico
    │   ├── index.html
    │   ├── logo192.png
    │   ├── logo512.png
    │   ├── manifest.json
    │   └── robots.txt
    └── src
        ├── App.js
        ├── App.test.js
        ├── components
        │   ├── Dashboard.js
        │   ├── Order.js
        │   ├── Product.js
        │   ├── auth
        │   │   ├── Login.js
        │   │   └── Register.js
        │   ├── customer
        │   │   ├── Catalogue.js
        │   │   └── Orders.js
        │   └── vendor
        │       ├── DispatchedOrders.js
        │       ├── Listings.js
        │       ├── NewProduct.js
        │       └── ReadyToDispatch.js
        ├── config.js
        ├── index.css
        ├── index.js
        ├── logo.svg
        ├── serviceWorker.js
        ├── setupTests.js
        ├── store.js
        └── utils
            ├── api.js
            └── privateRoute.js
```
