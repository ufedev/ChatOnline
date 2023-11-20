require('dotenv').config()
const express = require('express')
const logger = require('morgan')
const { createServer } = require('node:http')
const { Server } = require('socket.io')
const DB = require('./db/database')
const PORT = process.env.PORT ?? 4000

const messages = new DB()

// DB

// APP

const app = express()
const server = createServer(app)
const io = new Server(server) // io es todos los sockets y socket es el socket en concreto

io.on('connection', async (socket) => {
  const randomUser = (Math.random() + Date.now()).toString(36)
  socket.emit('setuser', randomUser)
  await messages.connect()

  let msjs = await messages.getMessages()

  socket.emit('allchat', msjs, randomUser)

  socket.on('message', async (message) => {
    await messages.newMessage(message)

    io.emit('getmessage', message, randomUser)
  })
})

app.use(logger('dev'))
app.use(express.static(__dirname + '/../client'))

app.get('/', async (req, res) => {
  res.sendFile(__dirname + '/../client/index.html')
})

server.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`)
})
