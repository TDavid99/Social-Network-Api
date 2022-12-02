// const express = require("express");
// const mongoose = require("mongoose");

// const app = express();

// const PORT = process.env.PORT || 3005;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use(express.static("public"));

// mongoose.connect(
// process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/social_network"
// );

// // mongodb://localhost:27017

// mongoose.set("debug", true);

// app.use(require("./routes"));

// app.listen(PORT, () => console.log(`Connected on localhost:${PORT}`));
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require('./routes'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/social-network-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.set('debug', true);

app.listen(PORT, () => console.log(`Connected on localhost:${PORT}`));