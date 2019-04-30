const express = require('express');
const bodyParser = require('body-parser');
const songs = require('./routes/songs.router');

const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// SYAS, "any request you get for the 'songs' route use the 'songs' router"
app.use('/songs', songs);

// EXTRACTED Pool imports and definitions to ./modules/pool.js

// EXTRACTED app.get and app.post to ./routers/songs.router.js

// TAKEAWAY: the idea of exctraction and separation of concerns

app.listen(PORT, () => {
    console.log('Listening on port: ', PORT);
})
