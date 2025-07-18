require('dotenv').config();
const express = require('express');
const movieRoutes = require('./routes/movieRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use('/api', movieRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
