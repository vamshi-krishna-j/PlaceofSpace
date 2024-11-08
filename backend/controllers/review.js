const ReviewSchema = require('../models/review')

const addReview = async (req, res) => {
    console.log('review')
    console.log(req.body)
    try {
        const { user_id: userId, _id: venueId, rating, feedback: reviewText } = req.body;

        const newReview = new ReviewSchema({
            user: userId,
            venueId,
            rating,
            reviewText,
        });

        await newReview.save();
        res.status(201).json({ message: 'Review created successfully', review: newReview });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Get all reviews for a product
const getAllReview = async (req, res) => {
    try {
        const { id: venueId } = req.params;
        const reviews = await ReviewSchema.find({ venueId }).populate('user', 'firstName')  // Populating the 'user' field and selecting 'username' only
            .exec();


        res.status(200).json({ reviews });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getAverageRating = async (req, res) => {
    try {
        const { id: venueId } = req.params; // Get the productId from the route parameters

        // Fetch all reviews for the given productId
        const reviews = await ReviewSchema.find({ venueId });

        // If there are no reviews for this product, return a message
        if (reviews.length === 0) {
            return res.status(404).json({ message: 'No reviews found for this product' });
        }

        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);

        const averageRating = totalRating / reviews.length;

        const averageRatingRounded = averageRating.toFixed(2);

        res.status(200).json({
            venueId: venueId,
            averageRating: averageRatingRounded
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// // Get all reviews by a user

const getUserReview = async (req, res) => {
    try {
        const { _id: userId } = req.params;
        const reviews = await ReviewSchema.findOne({ userId });
        res.status(200).json(reviews);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// // Update a review
// app.put('/reviews/:reviewId', async (req, res) => {
//     try {
//         const { reviewId } = req.params;
//         const { rating, reviewText } = req.body;

//         const review = await Review.findById(reviewId);
//         if (!review) {
//             return res.status(404).json({ error: 'Review not found' });
//         }

//         // Optionally check if the user has permission to edit
//         review.rating = rating;
//         review.reviewText = reviewText;
//         review.updatedAt = Date.now();

//         await review.save();
//         res.status(200).json({ message: 'Review updated successfully', review });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// // Delete a review
// app.delete('/reviews/:reviewId', async (req, res) => {
//     try {
//         const { reviewId } = req.params;

//         const review = await Review.findById(reviewId);
//         if (!review) {
//             return res.status(404).json({ error: 'Review not found' });
//         }

//         await review.remove();
//         res.status(200).json({ message: 'Review deleted successfully' });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

module.exports = {
    getAllReview,
    addReview,
    getAverageRating,
    getUserReview
}
