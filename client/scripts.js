const socket = io({
  auth: {
    serverOffSet: 0
  }
})

const form = document.getElementById('form')
const input = document.getElementById('input-message')
const box = document.getElementById('chat-box')

socket.on('setuser', (randomUser) => {
  localStorage.setItem('user', randomUser)
})

form.addEventListener('submit', async (e) => {
  e.preventDefault()
  if (input.value) {
    socket.emit('message', input.value)
    input.value = ''
  }
})

socket.on('getmessage', (message, randomUser) => {
  const user = localStorage.getItem('user')

  let text
  if (user === randomUser) {
    text = '<div class="chat-user"><p>' + message + '</p></div>'
  } else {
    text = '<p class="">' + message + '</p>'
  }
  box.innerHTML += text
  box.scrollTop = box.scrollHeight
})

socket.on('allchat', (data, randomUser) => {
  const user = localStorage.getItem('user')

  data.forEach((d) => {
    let text
    if (user !== randomUser) {
      text = '<div class="chat-user"><p>' + d.content + '</p><div>'
    } else {
      text = '<p class="">' + d.content + '</p>'
    }

    box.innerHTML += text
  })
  box.scrollTop = box.scrollHeight
})
