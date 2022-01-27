const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config()


// MIDDLEWARE
app.use(express.json())

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server started listening on PORT ${PORT}`);
});