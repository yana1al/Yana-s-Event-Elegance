const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
require('dotenv').config();
require('./config/database');

const mongoose = require('mongoose');
const passport = require('passport'); // Import Passport.js
const GoogleStrategy = require('passport-google-oauth20').Strategy; // Import Google OAuth strategy
const User = require('./models/user'); // Import User model (replace with your actual model)

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Passport configuration
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if user exists in the database
      let user = await User.findOne({ googleId: profile.id });
      if (!user) {
        // If user doesn't exist, create a new user
        user = new User({
          googleId: profile.id,
          email: profile.emails[0].value // You may store additional user information here
        });
        await user.save();
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

const indexRouter = require('./routes/index');
const eventsRouter = require('./routes/events');
const reviewsRouter = require('./routes/reviews');
const subscribersRouter = require('./routes/subscribers');
const authRouter = require('./routes/auth');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: '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',
  resave: false,
  saveUninitialized: true
}));

// Initialize Passport.js middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/events', eventsRouter);
app.use('/reviews', reviewsRouter); 
app.use('/subscribers', subscribersRouter); 
app.use('/auth', authRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
