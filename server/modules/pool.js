const pg = require('pg');

const Pool = pg.Pool;
const pool = new Pool({
    database: 'myronschippersjr',
    host: 'localhost',
    port: 5432, // database port vs server port
    max: 10, // number of connections at one time
    idleTimeoutMillis: 30000, // how long do you want it to be turned on before it disconnects
}); // talk about classes to demonstrate how we are using this

pool.on('connect', () => {
    console.log('Pool connected');
});

// start looking at how to handle when things don't work
pool.on('error', (err) => {
    console.log('There is an error: ', err);
});

module.exports = pool;
