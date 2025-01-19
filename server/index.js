import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"
import authRoutes from "./routes/AuthRoutes.js"
import contactRoutes from "./routes/ContactRoutes.js"
import setupSocket from "./socket.js"
import messagesRoute from "./routes/MessagesRoutes.js"

dotenv.config();


const app=express();
const port=process.env.PORT || 3001;
const databaseURL=process.env.DATABASE_URL;

app.use(cors({
    origin:[process.env.ORIGIN],
    methods:["GET","POST","PUT","PATCH","DELETE"],
    credentials:true, 
}));

app.use("/uploads/profiles",express.static("uploads/profiles"));
app.use("/uploads/files",express.static("uploads/files"));
app.use(cookieParser());
app.use(express.json());

app.use('/api/auth',authRoutes)
app.use('/api/contacts',contactRoutes)
app.use('/api/messages',messagesRoute)



const server=app.listen(port,()=>{
    console.log(`Server is running at htttp://localhost:${port}`)
})

setupSocket(server)

mongoose
.connect(databaseURL)
.then(()=>console.log("DB connection succesfull"))
.catch(err=>console.log(err.message))

















// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import mongoose from "mongoose";
// import authRoutes from "./routes/AuthRoutes.js";

// dotenv.config();

// const app = express();
// const port = process.env.PORT || 3001;
// const databaseURL = process.env.DATABASE_URL;

// // CORS configuration
// app.use(cors({
//     origin: process.env.ORIGIN || "http://localhost:5173",
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], // Added OPTIONS
//     credentials: true,
//     allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
// }));

// // Middleware
// app.use(cookieParser());
// app.use(express.json());

// // Routes
// app.use('/api/auth', authRoutes);

// // Error handling middleware
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).json({
//         status: "error",
//         message: "Something went wrong!"
//     });
// });

// // Database connection with retry logic
// const connectDB = async () => {
//     try {
//         await mongoose.connect(databaseURL, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log("Database connected successfully");
//     } catch (error) {
//         console.error("Database connection error:", error);
//         // Retry connection after 5 seconds
//         setTimeout(connectDB, 5000);
//     }
// };

// // Start server only after DB connection
// connectDB().then(() => {
//     const server = app.listen(port, () => {
//         console.log(`Server is running at http://localhost:${port}`);
//     });

//     // Handle server errors
//     server.on('error', (error) => {
//         console.error('Server error:', error);
//     });
// });