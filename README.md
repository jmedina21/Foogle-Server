# Foogle - Server Side

Welcome to the server side of **Foogle**! This Node.js application serves as the backend for **foogle.foo**, handling various functionalities such as web scraping, user authentication, and interaction with the database.

## FrontEnd - https://github.com/jmedina21/Foogle-Client.git

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Endpoints](#endpoints)
- [Database](#database)
- [Contributing](#contributing)


## Features

1. **Web Scraping:**
   The server uses Puppeteer to scrape listings from Craigslist, eBay, and Facebook Marketplace. These listings provide up-to-date product information for users.

2. **User Authentication:**
   The application supports user authentication through endpoints for user registration (signup) and user login, implementing jwt.

3. **Product Management:**
   Users can retrieve and post products they are interested in. These products are saved in the database and can be accessed through relevant endpoints.

## Technologies Used

- Node.js
- Express
- Puppeteer
- Knex.js
- MySQL
- JWT
- nodeMailer
- bcrypt

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/jmedina21/Foogle-Server.git
```

2. Install dependencies:
```bash
npm install
```

3. Set up your database configurations in a `.env` file:

- PORT = ???
- DB_NAME = ???
- DB_HOST = ???
- DB_USER = ???
- DB_PASSWORD = ???
- JWT_SECRET = ???
- EMAIL = ???
- EMAIL_PASSWORD = ???

4. To create a accounts you need to configure the transporter body from nodeMailer, line 9 in signup.js
Documentation in - https://github.com/nodemailer/nodemailer

5. Run the server:
```bash
node server
```

## Endpoints

- **GET /listings/craigslist?search=????** Get listings from Craigslist
- **GET /listings/ebay?search=????** Get listings from ebay
- **GET /listings/facebook?search=????** Get listings from facebook marketplace
- **POST /signup:** Register a new user.
- **POST /login:** Authenticate a user.
- **GET /products:** Retrieve saved products for a user.
- **POST /products:** Save a new product for a user.
- **DELETE /products:** Delete a saved product.
- **GET /validate:** Account verification


## Database

The application uses MySQL as the database to store user information, saved products, and other relevant data. Knex.js is used as a query builder to interact with the database.

Database migrations and seed files can be found in the `db` directory.

1. Install MySQL in your computer if you don't have it already

2. Create Database
```bash
CREATE DATABASE <name>;
```

3. Run migrations command
```bash
npx knex migrate:latest
```

4. Run seeding command
```bash
npx knex seed:run
```

## Contributing

Contributions to this project are welcome! If you find a bug or want to add a new feature, feel free to open an issue or submit a pull request.
