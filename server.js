const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const notesRoutes = require('./routes/notesRoutes')

//express app
const app = express()

//mongo DB link
const dbUrl = 'mongodb+srv://judegwapo:test12345@node.eqiod.mongodb.net/notes-db?retryWrites=true&w=majority'
mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => {
        console.log('Connected To Database Successfully')
        // listen to localhost server
        app.listen(8000);
    })
    .catch((error) =>{
        console.log(`Error Connecting to Database: ${error}`)
    })

//set ejs as view
app.set('view engine','ejs')

// middleware for static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
app.use(methodOverride('_method'))

// base page - main page
app.get('/', (req, res) => {
    res.redirect('/notes')
});

app.use('/notes', notesRoutes)

app.use((req, res) => {
    res.status(404).render('404')
})