// init body-parser
/*const bodyParser = require('body-parser');
app.use(bodyParser.json());*/
const express = require('express');
const app = express();
const PORT = 8080;

// init morgan
const morgan = require('morgan');
app.use(morgan('dev'));

// init body-parser
// Use built-in middleware in Express.js for parsing JSON
app.use(express.json());

// init cors
const cors = require('cors');
app.use(cors());

// init db client
const client = require('./db/client');

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Router: /api
app.use('/api', require('./api'));

app.listen(PORT, async () => {
    try {
        // Connect to the database when the server starts
        await client.connect();
        console.log(`Server listening on port ${PORT}`);
    } catch (err) {
        console.error(`Failed to listen on port ${PORT}`, err);
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});