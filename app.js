const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');

const app = express();
const port = process.env.PORT || 3000;
const mongoURI = process.env.mongoURI ;

app.listen(port, async () => {
    console.log(`Server running at PORT: ${port}`);

    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

    console.log("MongoDB Connected!");
});