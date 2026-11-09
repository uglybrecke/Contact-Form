// Import the express module
import express from 'express';

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

//store contact form data
const constacts = [];

//define a default route ("/")
app.get('/', (req, res) => {
    res.render('home');
});

// Receive the form data and add it
app.post('/submit', (req, res) => {
    contacts.push(req.body);

    res.send('saved!');
});

//start the server on the designated port
app.listen(PORT, () => {
    console.log(`Server is running at
        http://localhost:${PORT}`);
});