const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const mongoose = require('mongoose')
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
  
  const db = client.db();
  const usersCollection = db.collection('users');
  
  app.post('/api/auth/signup', async (req, res) => {

    const {email, password, acceptedRules,createdAt } = req.body

    try {    
      const isUserExits = await usersCollection.findOne({email})

      if(!isUserExits){
        const hash = await hashedPassword(password) 
        const userData = {
          email: email,
          password: hash,
          acceptedRules: acceptedRules,
          createdAt: createdAt
        };

        await usersCollection.insertOne(userData);
        console.log('Dane użytkownika zostały zapisane');
        res.status(200).json({success: true})
      } else {
        res.status(409).json({
          success: false,
          invalidEmail: true,
          message: 'Email does exists'
        })
      }
    } catch(error) {
      console.error(error);
      res.status(500).json({error: true})
    };
  });

  app.post('/api/auth/login', async (req, res) => {

    const {email, password} = req.body

    try {
      const user = await usersCollection.findOne({email: email})
      if(user){
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if(isPasswordMatch){
          res.status(200).json({
            success: true
          })
        } else {
          res.status(401).json({
            success: false,
            invalidPasswords: true, 
            message: 'Invalid Password'
          })
        }
      } else {
        res.status(404).json({
          success: false,
          message: "Cannot find user"
        })
      }
  
    } catch (error) {
      res.status(500).json({
        error: true
      })
    }
  })

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
