const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    like: {
        type: Number
    }

}, { timestamps: true });
const model = mongoose.model("Blog", blogSchema);

module.exports = model;