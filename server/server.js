const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');

const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const Pool = pg.Pool;
const pool = new Pool({
    database: 'myronschippersjr',
    host: 'localhost',
    port: 5432, // database port vs server port
    max: 10, // number of connections at one time
    idleTimeoutMillis: 30000, // how long do you want it to be turned on before it disconnects
}); // talk about classes to demonstrate how we are using this

// thinking of a class as though it were a declared Object
// demo class and constructor data

pool.on('connect', () => {
    console.log('Pool connected');
});

// start looking at how to handle when things don't work
pool.on('error', (err) => {
    console.log('There is an error: ', err);
});

// #2. demonstraight SQL Query to get all songs 
app.get('/', (req, res) => {
    const queryText = 'SELECT * FROM songs;';

    // pool.query('SELECT * FROM songs;')
    pool.query(queryText)
        .then((result) => {
            // show that you need to get rows
            // console.log(result);
            console.log(result.rows);
            // res.sendStatus(200);
            res.send(result.rows);
        })
        .catch((err) => {
            console.log('Hey there was an ERROR: ',  err);
            res.sendStatus(500);
        });
});

// #3. Have the class download and install Postman from https://www.getpostman.com/downloads/

// #4. write a post
app.post('/', (req, res) => {
    console.log(req.body);
    // now store the data inside the 'newSong' variable
    let newSong = req.body;

    // falsy query, correction to come
    // problem is with how the template string and PG interacts PG has $ namespaced
    // const queryText = `INSERT INTO songs (artist, track, published, rank)
    //     VALUES (${newSong.artist}, ${newSong.track}, ${newSong.publish}, ${newSong.rank});`;
    // correction
    // const queryText = `INSERT INTO "songs" ("artist", "track", "published", "rank")
    //     VALUES ('${newSong.artist}', '${newSong.track}', '${newSong.published}', '${newSong.rank}');`;
    // show specificity through the pluralization of a column name

    // looking at sanitization
    const queryText = `INSERT INTO songs (artist, track, published, rank)
        VALUES ($1, $2, $3, $4)`;
    
    // pool.query(queryText)
    // pool.query(queryText, [newSong.artist, newSong.track, newSong.published, newSong.rank])
    pool.query(queryText, [
            newSong.artist,
            newSong.track,
            newSong.published,
            newSong.rank
        ])
        .then((response) => {
            // console.log('GOT IT IN THE BASE');
            // async test
            // console.log('cat, test');
            // meaningful log
            console.log(response);
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log('Err: ', err);
            res.sendStatus(500);
        });

    // async problem because 200 has already been sent back
    // console.log('dog, test');
    // remove and use only the sendStatus in the .then()
    // res.sendStatus(200);
});

// #1. Listen first then test
app.listen(PORT, () => {
    console.log('Listening on port: ', PORT);
})
