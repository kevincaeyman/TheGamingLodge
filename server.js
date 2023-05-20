import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(cors());

const port = 5000;

app.get('/api/games', async (req, res) => {
  try {
    const response = await axios.get(
      'https://www.giantbomb.com/api/games/?api_key=e32053903724a60a9020ddb3666371d879f12488&filter=platform:playstation',
    );

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Proxy server listening on port ${port}`);
});
