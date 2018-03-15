const passport = require('passport');
const GoogleStartegy = require('passport-google-oauth20');
const keys = require('../config/keys');
const mongoose = require('mongoose');
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use(
  new GoogleStartegy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existedUser = await User.findOne({ googleID: profile.id });
      if (!existedUser) {
        const newUser = await new User({ googleID: profile.id }).save();
        return done(null, newUser);
      }
      return done(null, existedUser);
    }
  )
);
