// Importing Neccessary Modules
const express = require("express");
const mongoose = require("mongoose");
const logger = require('mongo-morgan-ext');
const config = require("../Config/keys");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

// mongodb Connection String
const db = config.mongoURL;

// Middleware
app.use(bodyParser.json());
// Logs all requests made to all endpoints
app.use(logger(db,"logs"));
// Cross Origin Requests 
app.use(cors({ origin: "*", optionsSuccessStatus: 200}))

// Connect to Mongo
mongoose.connect(db, {useNewUrlParser: true, useFindAndModify: false}).then(() => {
    console.log('MongoDB Connected...')
}).catch((err) => {
    console.log(err)
});
// setting url parser setting mongoose
mongoose.set('useNewUrlParser', true);

// Static route
app.use('/uploads', express.static('uploads'));

// Adding Routes
app.use("/api/options/send", require("./routes/api/options/send")); // For uploading content
app.use("/api/options/content", require("./routes/api/options/content")); // For fetching content

// listen on port 5000
// const port = process.env.PORT || 5000
const port = 5000;
app.listen(port, () => {
    console.log(`Started Server on Port ${port}`);
})