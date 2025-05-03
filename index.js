app.post('/api/generar-imagen', async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/images/generations',
      {
        model: 'dall-e-2',
        prompt,
        n: 1,
        size: '512x512'
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const imageUrl = response.data.data[0].url;
    res.json({ imageUrl });

  } catch (error) {
    console.error("Error al generar imagen:", error.response?.data || error.message);

    res.status(500).json({
      error: true,
      message: error.response?.data?.error?.message || 'Error desconocido al generar la imagen.'
    });
  }
});
