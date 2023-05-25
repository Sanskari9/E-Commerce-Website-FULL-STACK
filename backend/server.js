const app = require("./app");

const dotenv = require("dotenv");

dotenv.config({path: "backend/config/configure.env"});

app.listen(process.env.PORT,()=>{
    console.log(`Server is working on https://localhost:${process.env.PORT}`);
})