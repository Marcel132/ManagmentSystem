const express = require('express')
const bcrypt = require("bcrypt")

const router = express.Router()

module.exports = (usersCollection) => {
  router.post('/signup', async (req, res) => {

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
        console.log('Signup successful');
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
  
  router.post('/login', async (req, res) => {
  
    const {email, password} = req.body
  
    try {
      const user = await usersCollection.findOne({email: email})
      if(user){
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if(isPasswordMatch){
          res.status(200).json({
            success: true
          })
          console.log('Login successful')
        } 
        else if(!isPasswordMatch) {
          res.status(401).json({
            error: true, 
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

  return router
}


