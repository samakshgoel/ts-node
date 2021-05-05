import dotenv from "dotenv"
import express from "express"
import bodyParser from "body-parser"
const mongoose = require("mongoose");

import userRoute from "./src/routes/user"
import groupRoute from "./src/routes/group"

const app = express();
dotenv.config();

mongoose.Promise = global.Promise
// Connecting to the database //
mongoose.connect(process.env.MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Successfully connected to the database')
})
.catch((err:any) => {
    console.log('Could not connect to the database. Exiting now...', err)
    process.exit()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(userRoute);
app.use(groupRoute);


app.listen(process.env.PORT,()=>console.log(`server is running on port ${process.env.PORT}`));


