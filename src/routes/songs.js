const express = require('express')
const router = express.Router()

const {verifyToken} = require('../middlewares/validate-jwt')

const songsController = require('../controllers/songsController')

router.get('/',verifyToken,songsController.getAllSongs)

router.get('/top',verifyToken,songsController.getTopSongs)

module.exports = router;