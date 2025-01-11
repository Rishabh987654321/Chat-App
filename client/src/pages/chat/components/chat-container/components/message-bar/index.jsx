import EmojiPicker from 'emoji-picker-react'
import React, { useEffect, useRef, useState } from 'react'
import {GrAttachment} from "react-icons/gr"
import { IoSend } from 'react-icons/io5'
import { RiEmojiStickerLine } from 'react-icons/ri'
const MessageBar = () => {
    const emojiRef=useRef();
    const [message, setMessage] = useState("")
    const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

    useEffect(()=>{
        function handleClickOutSide(event){
            if(emojiRef.current && !emojiRef.current.contains(event.target)){
                setEmojiPickerOpen(false)
            }
        }
        document.addEventListener("mousedown",handleClickOutSide)
        return ()=>{
            document.removeEventListener("mousedown",handleClickOutSide)
        }
    },[emojiRef])

    const handleAddEmoji=(emoji)=>{
        setMessage((msg)=>msg + emoji.emoji)
    }
    const handleSendMessage=async ()=>{
        
    }
  return (
    <div className='h-[10vh] bg-[#1c1d25] flex justify-center items-center px-8 mb-5 gap-6 '>
        <div className="flex-1 flex bg-[#2a2b33] rounded-md items-center gap-5 pr-5 ">
            <input 
            type='text' 
            placeholder='Enter message'
            value={message}
            onChange={(e)=>setMessage(e.target.value)}
            className='flex-1 p-5 bg-transparent rounded-md focus:border-none focus:outline-none'/>

            <button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all">
                <GrAttachment className='text-2xl'/>
            </button>
            <div className="relative">
                <button
                onClick={()=>setEmojiPickerOpen(true)} 
                className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all">
                    <RiEmojiStickerLine className='text-2xl'/>
                </button>
                <div className='absolute bottom-16 right-0' ref={emojiRef}>
                    <EmojiPicker
                    theme='dark'
                    open={emojiPickerOpen}
                    onEmojiClick={handleAddEmoji}
                    autoFocusSearch={false}
                    />
                </div>
            </div>
        </div>
        <button 
        onClick={handleSendMessage}
        className="bg-[#8417ff] rounded-md flex items-center justify-center p-5 hover:bg-[#741bda] focus:bg-[#741bda] focus:border-none focus:outline-none focus:text-white duration-300 transition-all" aria-label="Send">
            <IoSend className='text-2xl'/>
        </button>
    </div>
  )
}

export default MessageBar