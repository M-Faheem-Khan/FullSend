// Importing Neccessary Modules
const express = require("express");
const mongoose = require("mongoose");
const logger = require('mongo-morgan-ext');
const config = require("../Config/keys");
const bodyParser = require("body-parser");
const app = express();

// Middleware
app.use(bodyParser.json());

// mongodb Connection String
const db = config.mongoURL;

// Logs all requests made to all endpoints
app.use(logger(db,"logs"));

// Connect to Mongo
mongoose.connect(db, {useNewUrlParser: true, useFindAndModify: false}).then(() => {
    console.log('MongoDB Connected...')
}).catch((err) => {
    console.log(err)
});
// setting url parser setting mongoose
mongoose.set('useNewUrlParser', true);

// Adding Routes
app.use("/api/options/send", require("./routes/api/options/send")); // For uploading content
app.use("/api/content", require("./routes/api/content")); // For fetching content

// listen on port 5000
// const port = process.env.PORT || 5000
const port = 5000;
app.listen(port, () => {
    console.log(`Started Server on Port ${port}`);
})