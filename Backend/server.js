const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const dbConfig = require('./server/db.config.js')
const cors = require('cors')

require('dotenv').config()
const paths = {
  auth: process.env.AUTH,
  users_settings: process.env.USERS_SETTINGS,
  users_resources: process.env.USERS_RESOURCES
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
    usersData: db.collection('usersData'),
    hasSub: db.collection('hasSub'),
    resources: db.collection('resources')
  }

  app.use(paths.auth, routes.Auth(collections))

  app.use(paths.users_settings, routes.UsersSettings(collections))

  app.use(paths.users_resources, routes.UsersResources(collections))


  app.listen(port, () => {
    console.log(`Serwer działa na porcie ${port}`);
  });

})
.catch(error => console.error(error));
