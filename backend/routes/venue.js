const express = require('express');
const { requireSignIn, dealerMiddleware } = require('../common_middlewares/index')
const { getAllVenues, createVenue, getVenueByVenueId, getAllVenuesByOwnerId, checkAvailability } = require('../controllers/venue');
const router = express.Router();
const multer = require('multer')
const shortid = require('shortid')
const path = require('path')

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, path.join(path.dirname(__dirname), 'uploads'))
//     },
//     filename: function (req, file, cb) {
//         cb(null, shortid.generate() + '-' + file.originalname)
//     }
// })
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    },
})
const upload = multer({ storage });

router.post('/create-venue', requireSignIn, dealerMiddleware, upload.array('venuePicture'), createVenue)
router.get('/venue/:venueId', getVenueByVenueId)
router.get('/venues/:ownerId', getAllVenuesByOwnerId)
router.get('/all-venues', getAllVenues);
router.get('/available', checkAvailability)

module.exports = router;