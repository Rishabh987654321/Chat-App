import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"
import authRoutes from "./routes/AuthRoutes.js"
import contactRoutes from "./routes/ContactRoutes.js"
import setupSocket from "./socket.js"
import messagesRoute from "./routes/MessagesRoutes.js"
import channelRoutes from "./routes/ChannelRoutes.js"

dotenv.config();


const app=express();
const port=process.env.PORT || 3001;
const databaseURL=process.env.DATABASE_URL;

// app.use(cors({
//     origin:[process.env.ORIGIN],
//     methods:["GET","POST","PUT","PATCH","DELETE"],
//     credentials:true, 
// }));
app.use((req, res, next) => {
    const allowedOrigin = 'https://chat-app-lovat-theta.vercel.app';
    res.header('Access-Control-Allow-Origin', allowedOrigin);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).send();
    }
    next();
});
app.use(cors({
    origin: [
        'https://chat-app-lovat-theta.vercel.app'
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use("/uploads/profiles",express.static("uploads/profiles"));
app.use("/uploads/files",express.static("uploads/files"));
app.use(cookieParser());
app.use(express.json());

app.use('/api/auth',authRoutes)
app.use('/api/contacts',contactRoutes)
app.use('/api/messages',messagesRoute)

app.use("/api/channel",channelRoutes);


const server=app.listen(port,()=>{
    console.log(`Server is running at htttp://localhost:${port}`)
})

setupSocket(server)

mongoose
.connect(databaseURL)
.then(()=>console.log("DB connection succesfull"))
.catch(err=>console.log(err.message))

