const express = require('express');
const dbPool = require('./dbBridge');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.get('/', async (req, res) => {
    try {
      res.send("Connected Successfully")
    } catch (err) {
      console.error(err.message);
    }
  });

app.get('/users', async (req, res) => {
try {
    const userData = await dbPool.query("SELECT * FROM UserInformationTable");
    res.json(userData[0]);
} catch (err) {
    console.error(err.message);
}
});

app.get('/users/:firstName/:lastName/:start/:end/:profession', async (req, res) => {
    try {
        const { firstName, lastName,start, end, profession } = req.params;
        const WHERE = "WHERE firstName = ? AND lastName = ? AND ? <= dateCreated AND dateCreated <= ? AND profession = ?"
        const query = "SELECT * FROM UserInformationTable " + WHERE
        const userData = await dbPool.query(query,
            [firstName, lastName,start, end, profession]);
        res.json(userData[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.get('/users/id/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const userData = await dbPool.query("SELECT * FROM UserInformationTable WHERE id = ?",
         [id]);
        res.json(userData[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.get('/users/name/:firstName/:lastName', async (req, res) => {
    try {
        const { firstName, lastName } = req.params;
        const userData = await dbPool.query("SELECT * FROM UserInformationTable WHERE firstName = ? AND lastName = ?",
         [firstName, lastName]);
        res.json(userData[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.get('/users/date/:start/:end', async (req, res) => {
    try {
        const { start, end } = req.params;
        const startDate = new Date(start).toISOString().split('T')[0];
        const endDate = new Date(end).toISOString().split('T')[0];
        const userData = await dbPool.query("SELECT * FROM UserInformationTable WHERE ? <= dateCreated AND dateCreated <= ?",
         [startDate, endDate]);
        res.json(userData[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.get('/users/profession/:profession', async (req, res) => {
    try {
        const { profession } = req.params;
        const userData = await dbPool.query("SELECT * FROM UserInformationTable WHERE profession = ?",
         [profession]);
        res.json(userData[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.get('/users/usersPerCountry/:country', async (req, res) => {
    try {
        const { country } = req.params;
        const userData = await dbPool.query("SELECT COUNT(*) FROM UserInformationTable WHERE country = ? ",
         [country]);
        res.json(userData[0]);
    } catch (err) {
        console.error(err.message);
    }
});

const port = 3001;
app.listen(port, () => {
    console.log(`Server listening on ${port}`);
})