const axios = require('axios');

const OMDB_API_URL = 'http://www.omdbapi.com/';
const OMDB_API_KEY = process.env.OMDB_API_KEY;

const searchMovies = async (req, res) => {
  const { title } = req.query;

  if (!title) {
    return res.status(400).json({ error: 'Title query parameter is required' });
  }

  try {
    const response = await axios.get(OMDB_API_URL, {
      params: {
        s: title,
        apikey: OMDB_API_KEY,
      },
    });

    if (response.data.Response === 'False') {
      return res.status(404).json({ error: response.data.Error });
    }

    res.json(response.data.Search);
  } catch (error) {
    console.error('Error fetching movie search:', error.message);
    res.status(500).json({ error: 'An error occurred while searching for movies' });
  }
};

const getMovieDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(OMDB_API_URL, {
      params: {
        i: id,
        apikey: OMDB_API_KEY,
      },
    });

    if (response.data.Response === 'False') {
      return res.status(404).json({ error: response.data.Error });
    }

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching movie details:', error.message);
    res.status(500).json({ error: 'An error occurred while fetching movie details' });
  }
};

module.exports = {
  searchMovies,
  getMovieDetails,
};
