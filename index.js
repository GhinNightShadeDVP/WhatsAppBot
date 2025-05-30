require('dotenv').config()
const makeWASocket = require('@adiwajshing/baileys').default
const { useSingleFileAuthState } = require('@adiwajshing/baileys')
const { handleCommand } = require('./commands/menu')
const { sendToOpenAI } = require('./utils/openai')
const { Boom } = require('@hapi/boom')
const express = require('express')
const fs = require('fs')

const { state, saveState } = useSingleFileAuthState('./session/auth_info.json')

async function connectToWhatsApp() {
  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true
  })

  sock.ev.on('creds.update', saveState)

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0]
    if (!msg.message || msg.key.fromMe) return

    const text = msg.message.conversation || msg.message.extendedTextMessage?.text || ''
    const sender = msg.key.remoteJid

    if (text.toLowerCase() === 'menu') {
      await handleCommand(sock, sender)
    } else {
      const reply = await sendToOpenAI(text)
      await sock.sendMessage(sender, { text: reply })
    }
  })
}

connectToWhatsApp()

const app = express()
app.get('/', (req, res) => res.send('Bot WhatsApp AI Aktif'))
app.listen(process.env.PORT || 3000, () => console.log('Server aktif'))
