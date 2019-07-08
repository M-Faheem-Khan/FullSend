const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uuid = require("uuid");

// Creating Schema for Course
const SendSchema = new Schema({
    DateCreated: {
        type: Date,
        required: true,
        default: Date.now
    },
    url: {
        type: String,
        required: true,
    },
    fileInfo: {
        type: Object,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    expireTime: {
        type: String,
        required: false
    },
    expireDownloads: {
        type: String,
        required: false
    }
});

module.exports = Send = mongoose.model("send", SendSchema);