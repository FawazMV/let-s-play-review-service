import express from "express";
import { getReviews, reviewSubmit } from "./Controllers/controllers.js";
const router = express.Router()


router.post('/review-submit', reviewSubmit)

router.get('/get-review', getReviews)

export default router