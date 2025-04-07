require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { resolve } = require('path');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');

const app = express();
const port = process.env.PORT || 3010;

app.use(bodyParser.json());
app.use(express.static('pages'));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.use('/', authRoutes);

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
