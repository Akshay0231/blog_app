const express = require('express');
const app = express();
const authRouter = require('./routes/auth')
const userRouter = require('./routes/users')

const dotenv = require('dotenv');
dotenv.config()

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: true,
}).then(console.log("Connected to MongoDB Server"))
    .catch((err) => console.log(err))

// MIDDLEWARE
app.use(express.json())

// routes
app.use('/auth', authRouter)
app.use('/user', userRouter)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server started listening on PORT ${PORT}`);
});