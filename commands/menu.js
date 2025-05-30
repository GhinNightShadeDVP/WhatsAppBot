async function handleCommand(sock, sender) {
  const menu = `
🤖 *BOT WHATSAPP AI*

Ketik pesan biasa untuk dijawab AI.
Ketik *menu* untuk menampilkan ini lagi.

📌 Fitur lainnya akan ditambahkan.
`
  await sock.sendMessage(sender, { text: menu })
}

module.exports = { handleCommand }