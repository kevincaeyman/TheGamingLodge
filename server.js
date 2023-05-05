import express from 'express';
import axios from 'axios';

const app = express();

app.use(express.json());

app.get('/api/games', async (req, res) => {
  const API_KEY = 'df9217646fc62c2ed3652ba455133f26eec84109';
  const API_URL = `https://www.giantbomb.com/api/games/?api_key=${API_KEY}&format=json`;

  try {
    const response = await axios.get(API_URL);
    res.header('Access-Control-Allow-Origin', '*');
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
