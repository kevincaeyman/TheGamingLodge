import express from 'express';
import axios from 'axios';

const app = express();

app.use(express.json());

app.get('/api/games', async (req, res) => {
  const API_KEY = '659e6634546b40f1aa9371bd8ab9e73e';
  const API_URL = `https://api.rawg.io/api/games?key=${API_KEY}&page_size=40&ordering=random&dates=1990-01-01,${new Date().toISOString().slice(0, 10)}`;

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
