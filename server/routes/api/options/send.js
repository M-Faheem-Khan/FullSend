const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const bcrypt = require('bcrypt');
const fs = require("fs");
const moment = require("moment");

// Schema Models
const Send = require("../../../models/send"); // Send schema model

// multer settings
const upload = require("../../../multer/storage");

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

router.post("/upload", (req, response, next)=>{   
    upload(req, response, function (err) {
        // need to check if the req.file is set.
        if(req.file == null || req.file == undefined || req.file == ""){
            response.status(404).json({
                status: 404,
                Response: "Resource does not exist",
                traceback: err
            });         
        } else {
            if (err) {
                console.log(err);
            } else {
                // coverting to int to the number of times the download is available for
                var expire_after_downloads;
                if (req.body.ExpireAfterDownloads !== "-"){
                    expire_after_downloads = parseInt(req.body.ExpireAfterDownloads);
                } else {
                    expire_after_downloads = req.body.ExpireAfterDownloads;
                }
                
                let data = {
                    password: req.body.password,
                    fileInfo: req.file,
                    expireTime: moment(new Date().now).add(parseInt(req.body.ExpireTime), 'm').toDate().toISOString(),
                    expireDownloads: expire_after_downloads,
                    url: "http://localhost:3000/content/url/" + uuid(),
                    password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
                }
                
                let newSend = new Send(data)
                //save the image
                newSend.save().then((resp) => {
                    response.status(200).json({"url": resp.url})
                }).catch((error) => {
                    response.status(404).json({
                        status: 404,
                        Response: "Resource does not exist",
                        traceback: error
                    });
                })
            }
        }
    });     
});

module.exports = router;