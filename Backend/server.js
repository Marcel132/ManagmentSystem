const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const dbConfig = require('./config/db.config.js')
const bcrypt = require("bcrypt")
const cors = require('cors')

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors(
  {origin: 'http://localhost:4200'}
))

MongoClient.connect(dbConfig.url, { useNewUrlParser: true, useUnifiedTopology: true })
.then(client => {
  console.log("Połączono z bazą danych MongoDB");

  
  const db = client.db();
  const usersCollection = db.collection('users');
  
  app.post('/api/users', (req, res) => {
    console.log("Metoda Post")

    const saltRounds = 10
    const {email, password, acceptedRules } = req.body

    console.log(email, password, acceptedRules)

    bcrypt.genSalt(saltRounds)
      .then(salt => bcrypt.hash(password, salt))
      .then(hash => {
        const userData = {
          email: email,
          password: hash,
          acceptedRules: acceptedRules
        };

        console.log(userData)

        return usersCollection.insertOne(userData);
    })
    .then(result => {
      console.log('Dane użytkownika zostały zapisane');
      res.status(200).json({success: true})
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({error: true})
    });
  });

  app.listen(port, () => {
    console.log(`Serwer działa na porcie ${port}`);
  });

})
.catch(error => console.error(error));
