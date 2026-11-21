// Import the express module
import express from 'express';

import 'dotenv/config';
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'contact'
});

//create an instance of an
//express application
const app = express();

//define a port number
//for our server to listen on
const PORT = 3002;

//ejs
app.set('view engine', 'ejs');

//read form data
app.use(express.urlencoded({ extended: false }));

//serve all files
app.use(express.static('.'));


//define a default route ("/")
app.get('/', (req, res) => {
    res.render('home');
});

app.post('/submit', async (req, res) => {
    try {
        const contact = req.body;
        contact.timestamp = new Date();

        const sql = `INSERT INTO contact.contacts
            (fname, lname, job, company, linkedIn, email, meeting, other, message, mailing, method, timestamp)
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`;

        const params = [
            contact.fname,
            contact.lname,
            contact.job,
            contact.company,
            contact.linkedIn,
            contact.email,
            contact.meeting,
            contact.other,
            contact.message,
            contact.mailing ?? null,
            contact.method ?? null,
            contact.timestamp
        ];

        const [result] = await pool.execute(sql, params);
        contact.id = result.insertId;

        res.render('confirm', { contact });

    } catch (err) {
        console.error('Database error:', err);
        res.status(500).send('Database error: ' + err.message);
    }
});

//add an ADMIN route route
app.get('/admin', async(req, res) => {
    //send this file
    // try/catch block for error handling
    try {
        const [contacts] = await pool.query('SELECT * FROM contact.contacts ORDER BY timestamp DESC');
        // Send the orders data back to the browser as JSON
        // res.send(orders[0]);
        res.render(`admin`, { contacts } );
    } catch(err) {
        // If ANY error happened in the 'try' block, this code runs
        // Log the error to the server console (for developers to see)
        console.error('Database error:', err);
        // Send an error response to the browser
        // status(500) means "Internal Server Error"
        res.status(500).send('Database error: ' + err.message);
    }
})

//contact route for contact page
app.get('/contact', (req, res) => {
    res.render('contact');
});

//start the server on the designated port
app.listen(PORT, () => {
    console.log(`Server is running at
        http://localhost:${PORT}`);
});