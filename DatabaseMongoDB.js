// Imports dependences 
import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();

//The connect method --> Connects the server to the database MongoDB.
mongoose.connect(`mongodb+srv://${process.env.USER_BENZY_MONGODB}:${process.env.PASSWORD_BENZY_DATABASE}@${process.env.CLUSTER_DB}.rvo8y.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)
    .then((response)=>{
        console.log(`Conected Database MongoDB!`)
}).catch((error)=>{
    console.log(`The error is: ${error}`)
})