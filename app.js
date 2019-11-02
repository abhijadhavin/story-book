const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

//LOAD MODEL
require('./models/User');
require('./models/Story');

//Passport Config
require('./config/passport')(passport);

//load routes
const index = require('./routes/index');
const auth = require('./routes/auth');
const stories = require('./routes/stories');

//LOAD KEYS
const keys = require('./config/keys');

const {
	trunctate,
	stripTags,
	formatDate,
	select,
	editIcon
} = require('./helpers/hbs');

//Map global promises
mongoose.Promise = global.Promise;

//Mongoose Connect
mongoose.connect(keys.mongoURI, {
	userMongoClient: true,
	useNewUrlParser: true,
	useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

const app = express();

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false })) ;
app.use(bodyParser.json());

//method override Middleware
app.use(methodOverride('_method'));

//Handlebars Middleware
app.engine('handlebars', exphbs({
	helpers: {
		trunctate: trunctate,
		stripTags: stripTags,
		formatDate: formatDate,
		select:select,
		editIcon: editIcon
	},
	defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(cookieParser());
app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: false
}));

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//set global vers 
app.use((req, res, next) => {
	res.locals.user = req.user || null;
	next();
});

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//use Routes
app.use('/', index);
app.use('/auth', auth);
app.use('/stories', stories);

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`Server Started on port ${port}`);
}); 

