
import {Server as SocketIOServer } from "socket.io";
import Message from "./models/MessagesModel.js";

const setupSocket=(server) =>{
    const io=new SocketIOServer(server,{
        cors:{
            origin:process.env.ORIGIN,
            methods:["GET","POST"],
            credentials:true,
        },
    });

    const userSocketMap=new Map();

    const disconnect=(socket)=>{
        console.log(`client disconnected: ${socket.id}`)
        for(const [userID,socketID] of userSocketMap.entries()){
            if(socketID===socket.id){
                userSocketMap.delete(userID);
                break;
            }
        }
    }

    const sendMessage=async(message)=>{
        const senderSocketId=userSocketMap.get(message.sender);
        const recipientSocketId=userSocketMap.get(message.recipient);

        const createdMessage=await Message.create(message);
        const messageData=await Message.findById(createdMessage._id)
        .populate("sender","id email firstName lastName image color")
        .populate("recipient","id email firstName lastName image color")

        if(recipientSocketId){
            io.to(recipientSocketId).emit("recieveMessage",messageData)
        }
        if(senderSocketId){
            io.to(senderSocketId).emit("recieveMessage",messageData)
        }
    }

    io.on("connection",(socket)=>{
        const userID=socket.handshake.query.userId;
        // console.log("Handshake query:", socket.handshake.query);

        if(userID){
            userSocketMap.set(userID,socket.id)
            console.log(`user connected: ${userID} with socket id ${socket.id}`);
        }else{
            console.log("user id not provided during connection")
        }

        socket.on("sendMessage",sendMessage)

        socket.on("disconnect",()=>disconnect(socket))
    })
}

export default setupSocket;