import mongoose from "mongoose";

const purchasedCourseSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    purchaseDate: {
        type: Date,
        required: true,
    },

});

export const PurchasedCourseSchema = mongoose.model('PurchasedCourseSchema', purchasedCourseSchema);