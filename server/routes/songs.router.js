const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// MAKES AN ASSUMPTION THAT WE ARE ALREADY IN THE SONGS ROUTE

// change route from '/songs' to '/', because /songs is already spent or defined
router.get('/', (req, res) => {
    const queryText = 'SELECT * FROM songs;';

    pool.query(queryText)
        .then((result) => {
            console.log(result.rows);
            res.send(result.rows);
        })
        .catch((err) => {
            console.log('Hey there was an ERROR: ',  err);
            res.sendStatus(500);
        });
});

// change route from '/songs' to '/', because /songs is already spent or defined
router.post('/', (req, res) => {
    console.log(req.body);
    let newSong = req.body;

    const queryText = `INSERT INTO songs (artist, track, published, rank)
        VALUES ($1, $2, $3, $4)`;

    pool.query(queryText, [
            newSong.artist,
            newSong.track,
            newSong.published,
            newSong.rank
        ])
        .then((response) => {
            console.log(response);
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log('Err: ', err);
            res.sendStatus(500);
        });
});

module.exports = router;