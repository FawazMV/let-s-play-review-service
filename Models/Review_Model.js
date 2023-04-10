import mongoose from 'mongoose'
const ReviewSchema = new mongoose.Schema
    (
        {
            turf: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'turfs',
                required: true
            },
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users',
                required: true
            },
            review: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            }
        },
        {
            timestamps: true
        }
    )

const Reviewmodel = mongoose.model('reviews', ReviewSchema)

export default Reviewmodel