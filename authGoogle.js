const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

const Google_ID = "604574523814-40f76epsh7ji778mnp5c57ct9jm41dqv.apps.googleusercontent.com";
const Google_Secret = "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";

passport.use(new GoogleStrategy({
    clientID: Google_ID,
    clientSecret: Google_Secret,
    callbackURL: "https://mplacement.herokuapp.com/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    return done(null, profile);
    
  }
));

passport.serializeUser(function(user, done) {
    done(null, user)
})

passport.deserializeUser(function(user, done) {
    done(null, user)
})