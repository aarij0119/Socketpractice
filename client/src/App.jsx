import React, { useEffect, useMemo, useState } from 'react'
import { io } from 'socket.io-client'

const App = () => {
  const socket = useMemo(() => io('http://localhost:3000/'), []);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  console.log(messages)
  useEffect(() => {
    socket.on("connect", (socket) => {
      console.log("connected")
    })
    socket.on("message", (message) => {
      console.log(message)
    })
    socket.on("recieve-message", (message) => {
      setMessages((messages) => [...messages, message])
    })
  }, [])
  const submithandler = (e) => {
    e.preventDefault();
    // console.log(message)
    setMessage('')
    socket.emit('message', message)
  }
  return (
    <>
      <h1 className='bg-green-600 text-xl font-bold w-fit px-2 mx-auto mt-3 rounded-lg text-white'>Wlcome to Socket.io</h1>
      <form onSubmit={(e) => {
        submithandler(e)
      }}>
        <div className='bg-red-500 w-fit mx-auto mt-10 rounded'>
          <input type='text' value={message} onChange={(e) => {
            setMessage(e.target.value)
          }} className='bg-zinc-400 mx-auto rounded px-2 py-1' />
        </div>
        <div className='bg-red-500 w-fit mx-auto mt-10 rounded'>
          <input type='submit' className='bg-blue-600 mx-auto rounded px-2 py-1' />
        </div>
      </form>
      <div>
        <ul>
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.sender === 'self' ? 'justify-end' : 'justify-start'}`}>
              <li className="bg-green-500 text-white w-fit px-1 py-1 mx-2 rounded-md mt-2">{m}</li>
            </div>
          ))}


          {/* <div className='flex justify-end mt-1'>
          <li className='bg-green-500 text-white w-fit px-1 py-1 mx-2 rounded-md'>Message One</li>
          </div> */}
        </ul>
      </div>
    </>
  )
}

export default App