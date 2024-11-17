const express = require('express');
const { addReview, getAllReview, getAverageRating, getUserReview, updateReview } = require('../controllers/review');

const router = express.Router();

router.post('/review', addReview);
router.get('/all_review/:id', getAllReview)
router.get('/avg_rating/:id', getAverageRating)
router.get('/userReview/:id', getUserReview)
router.patch("/", updateReview)

module.exports = router;
