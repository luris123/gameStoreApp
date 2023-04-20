const functions = require("firebase-functions");
const axios = require("axios");
const nodemailer = require("nodemailer");
const cors = require("cors")({ origin: true });
require('dotenv').config();

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-starte

const API_KEY = process.env.API_KEY;

exports.getAllGenres = functions.region("europe-west1").https.onRequest((request, response) => {
  cors(request, response, async () => {
    try {
      const res = await axios.get(
        `https://api.rawg.io/api/genres?key=${API_KEY}`
      );
      const results = res.data.results;
      response.send({
        "status": "success",
        results
      });

    } catch (error) {
      response.send({
        "status": error,
        "data": "Error occured"
      });
    }
  });
});

exports.getGames = functions.region("europe-west1").https.onRequest((request, response) => {
  cors(request, response, async () => {
    try {
      let results = [];

      const page = request.query.page;

      if (page <= 0 || page == undefined || page == null) {
        response.send({
          "status": "error",
          "data": "Invalid page number"
        });
        return;
      }

      let res = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${page}&page_size=40`);

      res.data.results.forEach(result => {
        results.push({ "id": result.id, "name": result.name, "background_image": result.background_image });
      });

      //if next page exists
      if (res.data.next) {
        response.send({
          "status": "success",
          results,
          "next": true
        });
      }
      else {
        response.send({
          "status": "success",
          results,
          "next": false
        });
      }

    } catch (error) {
      response.send({
        "status": error,
        "data": "Error occured"
      });
    }
  });
});

exports.getGamesByGenre = functions.region("europe-west1").https.onRequest((request, response) => {
  cors(request, response, async () => {
    try {
      let results = [];

      const genre = request.query.genre;
      const page = request.query.page;

      if (page <= 0 || page == undefined || page == null) {
        response.send({
          "status": "error",
          "data": "Invalid page number"
        });
        return;
      }

      const res = await axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}&genres=${genre}&page=${page}&page_size=40`
      );

      res.data.results.forEach(result => {
        results.push({ "id": result.id, "name": result.name, "background_image": result.background_image });
      });

      //if next page exists
      if (res.data.next) {
        response.send({
          "status": "success",
          results,
          "next": true
        });
      }
      else {
        response.send({
          "status": "success",
          results,
          "next": false
        });
      }
    } catch (error) {
      response.send({
        "status": error,
        "data": "Error occured"
      });
    }
  });
});


exports.getDetailsAboutTheGame = functions.region("europe-west1").https.onRequest((request, response) => {
  cors(request, response, async () => {
    try {
      const res = await axios.get(
        `https://api.rawg.io/api/games/${request.query.id}?key=${API_KEY}`
      );

      const results = res.data;

      response.send({
        "status": "success",
        results
      });
    }
    catch (error) {
      response.send({
        "status": error,
        "data": "Error occured"
      });
    }
  });
});

exports.sendEmail = functions.region("europe-west1").https.onRequest((request, response) => {
  cors(request, response, async () => {

    const email = request.body.email;
    const orderId = request.body.orderID;

    let totalPrice = 0;

    let games = [];

    function generateRandomString() {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let randomString = '';
      for (let i = 0; i < 12; i++) {
        // add hyphen after every 4 characters
        if (i > 0 && i % 4 === 0) {
          randomString += '-';
        }
        randomString += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return randomString;
    }

    request.body.products.forEach(product => {
      const redeemCode = generateRandomString();

      totalPrice += product.price;

      games.push({
        "name": product.name,
        "price": product.price,
        "redeemCode": redeemCode,
        "imageURL": product.image
      });
    });

    try {
      let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'gamestoreapp12@gmail.com',
          pass: 'ndsjsuwishlzjucw'
        }
      });

      const date = new Date().toLocaleString('fi-EU', { timeZone: 'Europe/Helsinki' });

      transporter.sendMail({
        from: `"GameStore" <gamestoreapp12@gmail.com>`,
        to: email,
        subject: 'GameStore Order Confirmation',
        html: `
        <html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        text-align: center;
        margin: 0;
        padding: 0;
      }

      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }

      h1 {
        font-size: 24px;
        margin-bottom: 30px;
      }

      h2 {
        font-size: 18px;
        margin-bottom: 10px;
      }

      p {
        font-size: 16px;
        margin-bottom: 5px;
      }

      .game {
        display: flex;
        align-items: center;
        margin-bottom: 30px;
        border-bottom: 1px solid #ccc;
        padding-bottom: 30px;
      }

      .game img {
        max-width: 100%;
        height: auto;
        margin: auto;
      }

      .game p {
        margin-bottom: 5px;
      }

      .underline {
        text-decoration: underline;
      }

    </style>
  </head>

  <body>
    <div class="container">
      <h1>Thank you for your order!</h1>
      <div>
        <h2><b>Order date:</b> ${date}</h2>
        <h2><b>Order id:</b> ${orderId}</h2>
        <h2><b>Order total:</b> ${totalPrice}€</h2>
      </div>
      <div>
        <h2 class="underline"><b>Order items</b></h2>
        ${games
            .map(
              (game) => `
              <div class="game">
                <img src="${game.imageURL}" />
                <div>
                  <p><b>Name:</b> ${game.name}</p>
                  <p><b>Price:</b> ${game.price}€</p>
                  <p><b>Redeem code:</b> ${game.redeemCode}</p>
                </div>
              </div>
            `
            )
            .join('')}
      </div>
      <h2 class="underline">Thank you for choosing GameStore!</h2>
    </div>
  </body>
</html>
        `
      })
        .then(console.info)
        .catch(console.catch);

      response.send({
        "status": "success",
        "data": "Email sent"
      });
    } catch (error) {
      response.send({
        "status": error,
        "data": "Error occured"
      });
    }
  });
});

