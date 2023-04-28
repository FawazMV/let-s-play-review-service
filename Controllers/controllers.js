import mongoose from "mongoose";
import { Axiosturf as axios } from "../Helpers/Axiosinstance.js";
import Reviewmodel from "../Models/Review_Model.js"

export const reviewSubmit = async (req, res) => {
    try {
        const { id, text, rating, user } = req.body;
        console.log(req.body)
        const newReview = Reviewmodel({
            rating, user, review: text, turf: id
        })
        await newReview.save();
        const result = await Reviewmodel.aggregate([
            { $match: { turf: new mongoose.Types.ObjectId(id) } },
            { $group: { _id: 1, avgRating: { $avg: "$rating" } } }
        ])
        if (result.length) {
            await axios.patch('/rating-update', { id, rating: result[0].avgRating })
        }
        return res.status(200).json({ message: "review added successfully" })
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

export const getReviews = async (req, res) => {
    try {
        const data = await Reviewmodel.aggregate([
            { $match: { turf: new mongoose.Types.ObjectId(req.query.id) } },
            { $lookup: { from: 'users', localField: 'user', foreignField: '_id', as: 'user' } },
            // { $unwind: '$user' },
            { $project: { 'user.username': 1, rating: 1, review: 1, createdAt: 1, 'user.profile': 1, } },
        ])
        console.log(data)
        return res.status(200).json(data)
    }
    catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}