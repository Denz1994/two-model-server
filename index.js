const express = require('express');
const dbPool = require('./dbBridge');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    try {
      const todos = await dbPool.query("SELECT * FROM todo");
      res.json(todos[0]);
    } catch (err) {
      console.error(err.message);
    }
  });

const port = 3000;
app.listen(port, () => {
    console.log(`Server listening on ${port}`);
})