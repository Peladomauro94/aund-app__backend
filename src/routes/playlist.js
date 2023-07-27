const express = require('express')
const router = express.Router()

const playlistController = require('../controllers/playlistController')

router.get('/',playlistController.getAllPlaylist)
router.get('/:id',playlistController.getPlaylist)
router.post('/cupido',playlistController.createPlaylistWithArtistList)

module.exports = router;