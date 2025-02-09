
import {Server as SocketIOServer } from "socket.io";
import Message from "./models/MessagesModel.js";
import Channel from "./models/ChannelModel.js";

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

    const sendChannelMessage=async(message)=>{
        const {channelId,sender,content,messageType,fileUrl}=message;

        const createdMessage=await Message.create({
            sender,recipient:null,content,messageType,timestamp:new Date(),fileUrl,
        });

        const messageData=await Message.findById(createdMessage._id)
        .populate("sender","id email firstName lastName image color")
        .exec();

        await Channel.findByIdAndUpdate(channelId,{
            $push:{messages:createdMessage._id}
        });

        const channel=await Channel.findById(channelId).populate("members");

        const finalData={...messageData._doc,channelId:channel._id}

        if(channel && channel.members){
            channel.members.forEach((member)=>{
                const memberSocketId=userSocketMap.get(member._id.toString());
                if(memberSocketId){
                    io.to(memberSocketId).emit("recieve-channel-message",finalData);
                }
            })
            const adminSocketId=userSocketMap.get(channel.admin._id.toString());
            if(adminSocketId){
                io.to(adminSocketId).emit("recieve-channel-message",finalData);
            }
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
        socket.on("send-channel-message",sendChannelMessage)
        socket.on("disconnect",()=>disconnect(socket))
    })
}

export default setupSocket;