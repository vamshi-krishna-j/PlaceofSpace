const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ReviewSchema = new mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
    venueId: { type: Schema.Types.ObjectId, ref: 'Veune', required: true }, // Reference to a product/service
    rating: { type: Number, required: true, min: 1, max: 5 }, // Rating between 1 and 5
    reviewText: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})
module.exports = mongoose.model('Review', ReviewSchema);