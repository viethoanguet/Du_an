//dotenv
require('dotenv').config();

// Connect DB
const { connectDB } = require('./configs/db')
connectDB();

const authRoute = require('./routers/authRoute')
const bookstoreRoute = require('./routers/bookstoreRoute')
const productRoute = require('./routers/productRoute')
const customerRoute = require('./routers/customerRoute')
const { register } = require('./controllers/authController')

const express = require('express')
const cors = require('cors')

const app = express();

// Cors
app.use(cors());

// Body Parser
app.use(express.json());

//Mount the route
app.use('/auth', authRoute);
app.use('/bookstore', bookstoreRoute);
app.use('/product', productRoute);
app.use('/customer', customerRoute)

app.get('/', (req, res, next) => {
    res.status(200).json({
        status: 'success',
        data: {
            posts: [{
                content: 'hello world',
                date: '20/11/2020'
            }]
        }
    })
})

const port = process.env.APP_PORT;

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})