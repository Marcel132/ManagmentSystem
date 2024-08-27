const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const dbConfig = require('./server/db.config.js')
const cors = require('cors')

require('dotenv').config()
const paths = {
  auth: process.env.AUTH,
  users: process.env.USERS,
}

const routes = require('./api/routes/routes.module.js')

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(cors(
  {origin: 'http://localhost:4200'}
))



MongoClient.connect(dbConfig.url, { useNewUrlParser: true, useUnifiedTopology: true })
.then(client => {
  
  const db = client.db();
  const collections = {
    users: db.collection('users'),
    isAuthorized: db.collection('isAuthorized'),
    usersData: db.collection('users_data')
  }

  app.use(paths.auth, routes.Auth(collections))

  app.use(paths.users, routes.UserSettings(collections))



  app.listen(port, () => {
    console.log(`Serwer działa na porcie ${port}`);
  });

})
.catch(error => console.error(error));
