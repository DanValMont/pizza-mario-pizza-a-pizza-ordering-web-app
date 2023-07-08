# PIZZA MARIO

A beautiful, responsive and SEO optimized pizza ordering web application using next.js.

## Features and Advantages

### Features

* The responsive design of the web application is made with only CSS, including the use of advanced techniques.
* It includes an impressive multi-purpose slider (offers, new product, etc) on the home page.
* There is a pizza list and features of each pizza on the homepage.
* There is a product page where customers can choose a pizza size and additional toppings. Any change on one or both features will immediately update the total price.
* There is a cart page displaying the product(s) that the user added. Each product has the option to be cancelled (eliminated) by the user if wanted.
* There is an order page where users can track their orders (preparing, on the way, delivered).

### Advantages

* After checking out (in cash or credit card through paypal) the user will get immediately an invoice of his/her order in pdf format and then redirected to an order page where he/she can track his/her order status (preparing, on the way, delivered).
* After the successful payment, the admin user is going to receive the money immediately in his/her account.
* There is a login page for admin user (/admin/login). After the login process, an admin dashboard page with sales statistics and charts will be displayed.
* On the orders page in admin dashboard, the admin user can change the status of any order (preparing, on the way, delivered) to inform the customer.
* Admin user can also manage to create (including uploading an image of a product), update and delete products.
* This pizza ordering web app can be fully customizable and adapted to any specialized restaurant (hamburgers, chinese, mexican, peruvian, etc).

## Technologies applied to this project

* **Next.js** a powerful full-stack React framework.
* **Redux Toolkit** to manage the state of the application in a predictable way.
* **Cookie** A basic HTTP cookie parser and serializer for HTTP servers.
* **Mongoose.js** to save and retrieve data from **Mongo DB Atlas** (database).
* **Easyinvoice** to easily create beautiful pdf invoices.
* **Paypal** checkout API to make payments for the orders.
* **React Chart.js** to display professional charts.
* Advanced **Mongo DB** functions like **aggregation** to calculate summary data for admin dashboard.
* **Cloudinary** server to upload files (images).

## Demo Website

[PIZZA MARIO](https://pizza-mario-pizza-a-pizza-ordering-web-app.vercel.app/)
