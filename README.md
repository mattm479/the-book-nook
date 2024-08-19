# The Book Nook

## Description

We created an online book store that allows a user to browse books by category or search for a specific book and add it to their cart as a hardcover, paperback, eBook, or audiobook. They can also create an account or login to an existing account. When logged in, they can view their user profile and change their email address and their order history.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Technologies](#technologies)
- [Credits](#credits)
- [License](#license)

## Installation

First clone the repository from Github. After cloning you'll need to rename `.env.EXAMPLE` to `.env` and fill out the variables with your credentials, the three variables ending in `_KEY` are for emailjs which is for the contact form to send an email, those are optional. The `JWT_SECRET` must be filled out for your JWT. Now, in the project root folder,  we can run `npm run install` in our terminal, this will install all the necessary packages where its needed. 

## Usage

After completing the installation, we can run `npm run develop` in our terminal. This should open a new window at localhost:3000.

The user starts out at the home page. From there they can view featured books, browse by category, or use the search bar to look up a book. The user can also view their cart, login, or signup. Once logged in, they can place an order, edit their account details, or view their order history.

## Links and Screenshot

Deployed on Render: https://the-book-nook-8cgy.onrender.com

Github Repository: https://github.com/mattm479/the-book-nook

[![image.png](https://i.postimg.cc/Vv8BNHRN/image.png)](https://postimg.cc/N9drJDZh)

## Technologies

Technologies used: Google Books API, React, Radix UI, Vite, MongoDB, JWT, Apollo, GraphQL, Express.js, Node.js, bcrypt, dotenv, emailjs

## Credits

By Stephanie DiLolle, Vincent Camarco, Chris Howard, Matthew Miskov, and Daniel Nunez 

Josh's Custom CSS Reset - https://www.joshwcomeau.com/css/custom-css-reset/

## License

MIT

