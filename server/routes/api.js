const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const db = "mongodb://localhost:27017/eventsdb";
mongoose.connect(db,{ useNewUrlParser: true }, err => {
    if(err) {
        console.error('Error in database connection - '+err);
    }else {
        console.log('connected to mongodb');
    }
});

function verifyToken(req, res, next) {
  if(!req.headers.authorization) {
    return res.status(401).send('unauthorized request');
  }
  let token = req.headers.authorization .split(' ')[1];
  if(token === 'null') {
    return res.status(401).send('unauthorized request');
  }
  let payload = jwt.verify(token, 'secretkey'); 
  if(!payload) {
    return res.status(401).send('unauthorized request');
  }
  req.userId = payload.subject
  next()
}

const User = require('../models/user');
router.get('/',(req,res) => {
    res.send('From API routes');
});

router.post('/register',(req,res) => {
    let userData = req.body;
    let user = new User(userData);
    user.save((error, registeredUser) => {
        if(error) {
            res.send(error);
        }else{
            let payload = {subject:registeredUser._id};
            let token = jwt.sign(payload,'secretkey');
            res.status(200).send({token});
        }
        
    });
});

router.post('/login',(req,res) => {
    let userData = req.body;
    let condition = {'email':userData.email, 'password':userData.password};
    User.findOne(condition, (error, user) => {
        if(error) {
            res.send({'error': error});
        }else {
            if(!user) {
                res.status(401).send({'success':false, 'userDetails':'invalid login details'});
            }else{
                let payload = { subject: user._id };
                let token = jwt.sign(payload, 'secretkey');
                res.status(200).send({'success':true, token});
            }
            
        }
    });

});


router.get('/events', (req,res) => {
    let events = [
      {
        "_id": "1",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "2",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "3",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "4",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "5",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "6",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      }
    ]
    res.json(events)
  })
  
  router.get('/special', verifyToken, (req, res) => {
    let specialEvents = [
      {
        "_id": "1",
        "name": "Auto Expo Special",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "2",
        "name": "Auto Expo Special",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "3",
        "name": "Auto Expo Special",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "4",
        "name": "Auto Expo Special",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "5",
        "name": "Auto Expo Special",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "6",
        "name": "Auto Expo Special",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      }
    ]
    res.json(specialEvents)
  })

module.exports = router;
