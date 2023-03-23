const functions = require("firebase-functions");
const axios = require("axios");
const cors = require("cors")({ origin: true });
require('dotenv').config();

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-starte

const API_KEY = process.env.API_KEY;

exports.getAllGenres = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    try {
      const res = await axios.get(
        `https://api.rawg.io/api/genres?key=${API_KEY}`
      );
      response.send({
        "status": "success",
        "data": res.data.results
      });
    } catch (error) {
      response.send({
        "status": error,
        "data": error
      });
    }
  });
});