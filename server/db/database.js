const mongoose = require('mongoose')
const { v4 } = require('uuid')

const MsjSchema = mongoose.Schema({
  content: {
    type: String
  },
  uuid: {
    type: String
  }
})

MsjSchema.pre('save', () => {
  this.uuid = v4()
})

const Msj = mongoose.model('Msj', MsjSchema)

class DB {
  client

  async connect() {
    try {
      await mongoose.connect(`${process.env.MONGODB}`)
      console.log('mongo conectado')
    } catch (err) {
      console.log(err)
    }
  }

  async newMessage(msj) {
    const message = new Msj({
      content: msj
    })
    await message.save()
  }

  async getMessages() {
    return await Msj.find()
  }
}

module.exports = DB
