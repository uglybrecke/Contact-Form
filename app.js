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

//serve all files
app.use(express.static('.'));

//store contact form data
const contacts = [];

//define a default route ("/")
app.get('/', (req, res) => {
    res.render('home');
});

// Receive the form data and add it with this route to submit
app.post('/submit', (req, res) => {
    contacts.push(req.body);

    res.render('confirm');
});

// make this page have access to contacts
app.get('/admin', (req, res) => {
    res.render('admin', {contacts});
});

//start the server on the designated port
app.listen(PORT, () => {
    console.log(`Server is running at
        http://localhost:${PORT}`);
});