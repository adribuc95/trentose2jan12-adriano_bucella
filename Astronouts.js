const express = require('express'),
    bodyParser = require('body-parser');
const astronouts = express.Router()

var uuid = require('uuid-v4');

const astronoutsArray = [
    {
        "id": "1",
        "firstName": "Luca",
        "lastName": "Verdi",
        "isInSpace": "false"
},
    {
        "id": "2",
        "firstName": "Luca",
        "lastName": "Bucci",
        "isInSpace": "false"
},
    {
        "id": "3",
        "firstName": "Luca",
        "lastName": "Caola",
        "isInSpace": "false"
},
    {
        "id": "4",
        "firstName": "Luca",
        "lastName": "Barile",
        "isInSpace": "false"
}]

astronouts.route('/astronouts')
    //simpleget return all objects
    .get((req, res) => {
        var lastName = ''
        if (req.query.lastName) {
            lastName = req.query.lastName
            var checklastName = function (astronout) {
                return astronout.lastName == lastName
            }
            var array = astronoutsArray.filter(checklastName, lastName)
            res.json(array)
        } else {
            res.status(200)
            res.json(astronoutsArray)
        }

    })
    //post an object
    .post((req, res) => {
        var astronout = {}
        astronout.id = uuid()
        if (req.body.firstName) astronout.firstName = req.body.firstName
        if (req.body.lastName) astronout.lastName = req.body.lastName
        if (req.body.isInSpace) astronout.isInSpace = req.body.isInSpace
        astronoutsArray.push(astronout)
        res.status(200)
        res.json(astronout)
    });
astronouts.route('/astronout/:id')
    .get((req, res) => {
        var id = req.params.id
        const i = astronoutsArray.findIndex(astronout => {
            return astronout.id == id
        })
        if (i == -1) res.sendStatus(404)
        else {
            res.status(200)
            res.json(astronoutsArray[i])
        }
    })
    .put((req, res) => {
        var id = req.params.id
        const i = astronoutsArray.findIndex(astronout => {
            return astronout.id == id
        })
        if (i == -1) res.sendStatus(404)
        else {
            if (req.body.firstName) astronoutsArray[i].firstName = req.body.firstName
            if (req.body.lastName) astronoutsArray[i].lastName = req.body.lastName
            if (req.body.isInSpace) astronoutsArray[i].isInSpace = req.body.isInSpace
            res.status(200)
            res.json(astronoutsArray[i])
        }
    })


module.exports = astronouts
