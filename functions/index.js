const functions = require("firebase-functions");
const axios = require("axios");
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

      if(page <= 0 || page == undefined || page == null){
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
      if(res.data.next){
        response.send({
          "status": "success",
          results,
          "next": true
        });
      }
      else{
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

      if(page <= 0 || page == undefined || page == null){
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
      if(res.data.next){
        response.send({
          "status": "success",
          results,
          "next": true
        });
      }
      else{
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
