const functions = require("firebase-functions");
const axios = require("axios");
const cors = require("cors")({ origin: true });

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-starte

exports.getAllGenres = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    try {
      const res = await axios.get(
        `https://api.rawg.io/api/genres?key=ff1c5d0eb69e428696fd5b80b5cf49df`
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