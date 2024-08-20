const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const mongoose = require('mongoose')
const dbConfig = require('./config/db.config.js')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")

const routes = require('./routes/routes.module.js')

const app = express();
const port = 3000;


app.use(bodyParser.json());
app.use(cors(
  {origin: 'http://localhost:4200'}
))



MongoClient.connect(dbConfig.url, { useNewUrlParser: true, useUnifiedTopology: true })
.then(client => {
  
  const db = client.db();
  const usersCollection = db.collection('users');


  app.use('/v01/api/auth', routes.auth(usersCollection, hashedPassword))

  async function hashedPassword(password){
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    return hash
  }

  app.listen(port, () => {
    console.log(`Serwer działa na porcie ${port}`);
  });

})
.catch(error => console.error(error));
