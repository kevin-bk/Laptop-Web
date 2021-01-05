const express = require('express')
const exphbs = require('express-handlebars');
var methodOverride = require("method-override");
var path = require('path');
const route = require('./routes/index');
const con = require("./db/db.js");
const cookieParser = require('cookie-parser')
const sessionMiddleware = require('./middlewares/session.middleware.js');

const app = express()
const port = 3000;

// connecting route to database
app.use(function(req, res, next) {
    req.con = con
    next();
  })
app.use(cookieParser("qwerty3120"));
app.use(sessionMiddleware);

app.use(express.urlencoded({
    extended: true
  }));
app.use(express.json());
app.use(methodOverride("_method"));

// view engine
app.engine('.hbs', exphbs({
    extname: '.hbs',
    helpers: {
      sum: (a,b) => a + b,
      section: function(name, options) { 
        if (!this._sections) this._sections = {};
          this._sections[name] = options.fn(this); 
          return null;
        },
  }
  }));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

// static field
app.use(express.static(path.join(__dirname, 'public')))
route(app);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})