const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const dbConfig = require('./config/db.config.js')
const bcrypt = require("bcrypt")

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(dbConfig.url, { useNewUrlParser: true, useUnifiedTopology: true })
.then(client => {
  console.log("Połączono z bazą danych MongoDB");
  
  const db = client.db();
  const usersCollection = db.collection('users');
  
  app.get('/signup', (req, res) => {

  const saltRounds = 10
  const queryPassword = req.query['signup-password']
  bcrypt.genSalt(saltRounds)
    .then(salt => bcrypt.hash(queryPassword, salt))
    .then(hash => {
      const userData = {
        email: req.query['signup-email'],
        password: hash,
        acceptedRules: req.query['accept-rules'] === 'on'
      };

      return usersCollection.insertOne(userData);
    })
    .then(result => {
      console.log('Dane użytkownika zostały zapisane');
      res.send('Rejestracja zakończona sukcesem!');
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Wystąpił błąd podczas rejestracji.');
    });
  });

  app.listen(port, () => {
    console.log(`Serwer działa na porcie ${port}`);
  });

})
.catch(error => console.error(error));
