// const express = require('express')
// const dotenv = require('dotenv')
// const mongoose = require('mongoose')
// const cookieParser = require('cookie-parser')

// const app = express()
// const cors = require('cors');
// dotenv.config()

// const uri = process.env.DATABASE_URL;

// const connect = async () => {
//   try {
//     await mongoose.connect(uri);
//     console.log('Mongodb connected');
//   }catch (error){
//   throw error;
//   }

// };
// //middlewares
// app.use(cors());
// app.use(express.json());
// app.use(cookieParser());

// app.use((err, req, res, next)=> {
//   const errorStatus = err.status || 500;
//   const errorMessage = err.message  || "Something went wrong!";
//   return res.status(errorStatus).json({
//     success: false,
//     status: errorStatus,
//     message: errorMessage,
//     stack: err.stack,
//   });
// })

// app.listen(8800, ()=>{
//     connect()
//     console.log(`Server running on port 8800`);
// })