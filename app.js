require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const { pool } = require('./api/models/database');
const postRouter = require('./api/routes/postRouter');

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('combined'));
app.use('/', postRouter);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/ping', function (req, res, next) {
  res.json({ message: 'pong' });
});

const PORT = process.env.PORT;

app.listen(PORT, async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ DB connection success!');
    connection.release();

    console.log(`🚀 Listening to request on port: ${PORT}`);
  } catch (error) {
    console.error('❌ Error during initialization:', error);
    process.exit(1);
  }
});
