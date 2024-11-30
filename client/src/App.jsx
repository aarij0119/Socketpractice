import React, { useEffect, useMemo, useState } from 'react'
import {io} from 'socket.io-client'

const App = () => {
  const socket = useMemo(()=>io('http://localhost:3000/'),[]);
  const [message, setMessage] = useState('');
  useEffect(()=>{
    socket.on("connect",  ()=>{
      console.log("connected")
    })
    socket.on("message",(message) => {
      console.log(message)
    })
  },[])
  const submithandler = (e) =>{
    e.preventDefault();
    console.log(message)
    setMessage('')
    socket.emit('message', message)
  }
  return (
    <>
    <h1 className='bg-green-600 text-xl font-bold w-fit px-2 mx-auto mt-3 rounded-lg text-white'>Wlcome to Socket.io</h1>
    <form onSubmit={(e)=>{
      submithandler(e)
    }}>
      <div className='bg-red-500 w-fit mx-auto mt-10 rounded'>
      <input type='text' value={message}  onChange={(e)=>{
        setMessage(e.target.value)
      }} className='bg-zinc-400 mx-auto rounded px-2 py-1' />
      </div>
      <div className='bg-red-500 w-fit mx-auto mt-10 rounded'>
      <input type='submit' className='bg-blue-600 mx-auto rounded px-2 py-1' />
      </div>
      
    </form>
    </>
  )
}

export default App