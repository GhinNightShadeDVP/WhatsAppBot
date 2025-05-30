const axios = require('axios')

async function sendToOpenAI(prompt) {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }]
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    )
    return response.data.choices[0].message.content.trim()
  } catch (err) {
    console.error(err.response?.data || err)
    return '⚠️ Maaf, terjadi kesalahan saat menghubungi AI.'
  }
}

module.exports = { sendToOpenAI }