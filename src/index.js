const express = require('express')
const app = express()
const { engine } = require('express-handlebars');
const path = require('path')
const morgan = require('morgan')
const port = 3000
const db = require('./config/db')
const route = require('./routes')
const methodOverride = require('method-override')

// http logger
// app.use(morgan('combined'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride('_method'))

//templates engine
app.engine('hbs', engine({
    extname: '.hbs',
    helpers: {
        sum: (a, b) => a + b
    }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));


// routes init
route(app);

//Connect to db
db.connect();

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})