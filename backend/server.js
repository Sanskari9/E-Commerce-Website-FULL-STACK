const app = require("./app");

const dotenv = require("dotenv");
const connectDB = require("./config/database")

//UncaughtError 
process.on("uncaughtException",(err) =>{
    console.log(`Error: ${err}`);
    console.log(`Shutting down the server due to UncaughtExpection`);

    server.close(() =>{
        process.exit(1)
    });
})


// config
dotenv.config({path: "backend/config/configure.env"});

//connecting to database
connectDB();

const server = app.listen(process.env.PORT,()=>{
    console.log(`Server is working on https://localhost:${process.env.PORT}`);
})


//UnhandledRejections
process.on("unhandledRejection",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejections`);

    server.close(() =>{
        process.exit(1)
    });
})