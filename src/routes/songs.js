const express = require('express')
const router = express.Router()

const songsController = require('../controllers/songsController')

router.get('/',songsController.getAllSongs)
// router.get('/:id',songsController.getSong)

router.get('/top',songsController.getTopSongs)

router.get('/search',songsController.searchSong)

module.exports = router;