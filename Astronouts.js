const express = require('express'),
bodyParser = require('body-parser');
const astronouts = express.Router()

var uuid = require('uuid-v4');

const arrayAstronouts = [
  {
    "id": "1",
    "firstName": "ale",
    "lastName": "ametis",
    "isInSpace": "false"
}]

astronouts.route('/astronouts')
  //simpleget return all objects
    .get((req, res) => {
    res.status(200)
    res.json(arrayAstronouts)
  })
//post an object
  .post((req, res) => {
    var astronaut = {}
    astronaut.id = uuid()
    if (req.body.firstName) astronaut.firstName = req.body.firstName
    if (req.body.lastName) astronaut.lastName = req.body.lastName
    if (req.body.isInSpace) astronaut.isInSpace = req.body.isInSpace
    arrayAstronouts.push(astronaut)
    res.status(200)
    res.json(astronaut)
  });
astronouts.route('/astronaut/:id')
  .get((req, res) => {
    var id = req.params.id
    const i = arrayAstronouts.findIndex(astronaut => {return astronaut.id === id})
    if (i==-1) res.sendStatus(404)
    else {
      res.status(200)
      res.json(arrayAstronouts[i])
    }
  })
  .put((req, res) => {
    var id = req.params.id
    const i = arrayAstronouts.findIndex(astronaut => {return astronaut.id === id})
    if (i==-1) res.sendStatus(404)
    else {
      if (req.body.firstName) arrayAstronouts[i].firstName = req.body.firstName
      if (req.body.lastName) arrayAstronouts[i].lastName = req.body.lastName
      if (req.body.isInSpace) arrayAstronouts[i].isInSpace = req.body.isInSpace
      res.status(200)
      res.json(arrayAstronouts[i])
    }
  })


module.exports = astronouts