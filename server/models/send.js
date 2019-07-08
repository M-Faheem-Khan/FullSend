const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uuid = require("uuid");

const tinyURLSchema = new Schema({
    url: {
        type: String,
        required: false
    },
    parentURL: {
        type: String,
        required: false //true
    },
    DateCreated: {
        type: Date,
        required: true,
        default: Date.now
    }
});

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
    tinyURL: {
        type: tinyURLSchema,
        required: false
    },
    data: {
        type: String,
        required: true
    },
    uploaderInfo: {
        uploadTime: {
            type: Date,
            required: true,
            default: Date.now
        }
    },
    password: {
        type: String,
        required: true,
    },
    expireTime: {
        type: Date,
        required: false
    },
    expireDownloads: {
        type: Date,
        required: false
    }
});

module.exports = Send = mongoose.model("send", SendSchema);