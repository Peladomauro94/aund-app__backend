const express = require('express')
const router = express.Router()

const {verifyToken} = require('../middlewares/validate-jwt')

const auth = require('./auth')
const songs = require('./songs')
const playlists = require('./playlist')
const artists = require('./artist')
const genders = require('./gender')

router.use('/', auth)
router.use('/songs',verifyToken, songs)
router.use('/playlists',verifyToken, playlists)
router.use('/artists',verifyToken, artists)
router.use('/genders',verifyToken, genders)

module.exports = router