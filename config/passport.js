const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
  clientID: '562293342147-tj3b62ouoqdf06b8hogmtg8k5m5q90t7.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: 'https://yana-s-invitess-c5fb1ede161f.herokuapp.com/oauth2callback'
}, (accessToken, refreshToken, profile, done) => {
  // Verify user and create or retrieve user record in database
}));

// Serialize user into session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser((id, done) => {
  // Retrieve user from database using id
});
