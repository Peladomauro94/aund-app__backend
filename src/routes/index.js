const express = require('express')
const router = express.Router()

const {verifyToken} = require('../middlewares/validate-jwt')

const auth = require('./auth')
const songs = require('./songs')
const playlists = require('./playlist')

router.use('/', auth)
router.use('/songs',verifyToken, songs)
router.use('/playlists',verifyToken, playlists)

module.exports = router