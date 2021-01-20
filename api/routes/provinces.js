const helpers = require('./_helpers.js')
const utils = require('../utils/mongooseFunctions')
const express = require('express')
const router = express.Router()
const required = require('../middlewares/token')
import model from '../models/province'
import Debug from 'debug'
const debug = new Debug(`api/province`)

router.get('/', (req, res, next) => {
    return helpers.find(model, req, res)
})

router.get('/:id', (req, res, next) => {
    return helpers.findById(model, req, res)
})

router.post('/', (req, res, next) => {
    return helpers.save(model, req, res)
})

router.put('/:id', (req, res, next) => {
    return helpers.findByIdAndUpdate(model, req, res);
})

router.delete('/all', (req, res, next) => {
    return helpers.deleteAll(model, req, res)
})

router.delete('/:id', (req, res, next) => {
    return helpers.delete(model, req, res)
})

module.exports = router
