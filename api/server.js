const express = require('express');
const mongoose = require('mongoose');
const app = express();
const productRoute = require('./routes/productRoute');
const errorMiddleware = require('./middleware/errorMiddleware');
const cors = require('cors');
require('dotenv').config();

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/api/products', productRoute);

app.get('/', (req, res) => {
    res.send('Hello NODE API');
});

app.use(errorMiddleware);


mongoose.connect(MONGO_URL)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Node API is running on port ${PORT}`);
        });  
    }).catch(err => {
        console.log(err);
    });