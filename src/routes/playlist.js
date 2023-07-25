const express = require('express')
const router = express.Router()

const playlistController = require('../controllers/playlistController')

router.get('/',playlistController.getAllPlaylist)

module.exports = router;