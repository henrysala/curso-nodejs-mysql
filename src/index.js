const express = require('express');
const morgan = require('morgan');
const exhbs = require('express-handlebars');
const path = require('path');

// initializations
const app = express();

//settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exhbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', 'hbs');

//midleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Glabal variables
app.use((req,res,next) => {
    next();
});

// Routes
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/links', require('./routes/links'));


// public
app.use(express.static(path.join(__dirname, 'public')));

// Starting the server
app.listen(app.get('port'),  () => {
    console.log('Server on port', app.get('port'));
});