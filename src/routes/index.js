const express = require('express')
const router = express.Router()

const auth = require('./auth')
const songs = require('./songs')

router.use('/', auth)
router.use('/songs',songs)

module.exports = router