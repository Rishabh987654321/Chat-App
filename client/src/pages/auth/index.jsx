import React, { useState } from 'react'
import Background from "@/assets/login2.png"
import Victory from "@/assets/victory.svg"
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import {apiClient} from "@/lib/api-client"
import { LOGIN_ROUTE, SIGNUP_ROUTE } from '@/utils/constants'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '@/store'
const Auth = () => {

  const navigate=useNavigate()

  const {setUserInfo}=useAppStore()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateSignup=()=>{
    if(!email.length){
      toast.error("Email is required.")
      return false;
    }
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }
    if (!password.length) {
      toast.error("Password is required.");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return false;
    }
    return true;
  }

  const validateLogin = () => {
    if (!email.length) {
      toast.error("Email is required.");
      return false;
    }
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }
    if (!password.length) {
      toast.error("Password is required.");
      return false;
    }
    return true;
  };

  const handleLogin=async()=>{
    if(validateLogin()){
      const response=await apiClient.post(LOGIN_ROUTE,{email,password},{withCredentials:true});
      console.log(response)
      if(response.data.user.id){
        setUserInfo(response.data.user)
        if(response.data.user.profileSetup) navigate("/chat")
          else navigate("/profile ")
      }
    }
    
  }
  const handleSignup=async()=>{
    if(validateSignup()){
      const response=await apiClient.post(
        SIGNUP_ROUTE,{email,password},
        {withCredentials:true}
      );
      if(response.status===201){
        setUserInfo(response.data.user)
        navigate("/profile")
      }
      console.log(response)
    }
  }

  return (
    <div className='h-[100vh] w-[100vw] flex items-center justify-center'>
      <div className='h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2 '>
        <div className='flex flex-col gap-10 items-center justify-center'>
          <div className='flex items-center justify-center flex-col'>
            <div className='flex items-center justify-center'>
              <h1 className='text-5xl font-bold md:text-6xl'>Welcome</h1>
              <img src={Victory} alt="Victory Emoji" className='h-[100px]' />
            </div>
            <p className='font-medium text-center'>Fill in the details to get started with the best chat app!</p>
          </div>
          <div className='flex items-center justify-center w-full'>
            <Tabs defaultValue="login" className='w-3/4'>
              <TabsList className='bg-transparent rounded-none w-full '>
                <TabsTrigger value="login" className='data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300 '>Login</TabsTrigger>
                <TabsTrigger value="signup" className='data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300 '>Sign Up</TabsTrigger>
              </TabsList>
              <TabsContent value="login" className='flex flex-col gap-5 mt-10'>
                <Input 
                placeholder="Email" 
                type="email" 
                className="rounded-full p-6" 
                value={email} 
                onChange={(e)=>setEmail(e.target.value)}
                />
                <Input 
                placeholder="Password" 
                type="password" 
                className="rounded-full p-6 " 
                value={password} 
                onChange={(e)=>setPassword(e.target.value)}
                />
              <Button 
              className="rounded-full p-6"
              onClick={handleLogin}
              >
                Login
              </Button>
              </TabsContent>
              <TabsContent value="signup" className='flex flex-col gap-5'>
              <Input 
                placeholder="Email" 
                type="email" 
                className="rounded-full p-6" 
                value={email} 
                onChange={(e)=>setEmail(e.target.value)}
                />
                <Input 
                placeholder="Password" 
                type="password" 
                className="rounded-full p-6 " 
                value={password} 
                onChange={(e)=>setPassword(e.target.value)}
                />
                <Input 
                placeholder="Confirm Password" 
                type="password" 
                className="rounded-full p-6 " 
                value={confirmPassword} 
                onChange={(e)=>setConfirmPassword(e.target.value)}
                />
                <Button 
              className="rounded-full p-6"
              onClick={handleSignup}
              >
                SignUp
              </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className='hidden xl:flex justify-center items-center '>
          <img src={Background} alt="Background image" className="h-[500px]" />
        </div>
      </div>
    </div>
  )
}

export default Auth