const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const bcrypt = require('bcrypt');

// Schema Models
const Send = require("../../../models/send"); // Send schema model

// Test endpoint to ensure that endpoint is working
router.get("/status", (request, response) => {
    response.status(200).json({Response: "OK"})
})

router.get("/everything", (request, response) => {
    Send.find({}).sort({DateCreated: 1}).then((docs) => {
        response.status(200).json({
            status: 200,
            Response: "OK",
            data: docs,
        });
    }).catch((error) => {
        response.status(404).json({
            status: 404,
            Response: "Resourse does not exist",
            traceback: error
        });
    });
})

router.post("/upload", (request, response) => {
    let data = {
        url: "http://localhost:5000/content/" + uuid(),
        data: bcrypt.hashSync(request.body.uploadData, bcrypt.genSaltSync(10)),
        uploaderInfo: {
            filePath: request.body.Info.filePath,
            fileName: request.body.Info.fileName
        },
        password: bcrypt.hashSync(request.body.password, bcrypt.genSaltSync(10)),
        expireTime: request.body.ExpireTime
    }
    const newSend = new Send(data);
    newSend.save().then((item) => {
        response.status(200).json({
            success: true,
            url: item.url
        });
    }).catch((error) => {
        response.status(200).json({
            success: false,
            traceback: error
        })
    });
});

module.exports = router;