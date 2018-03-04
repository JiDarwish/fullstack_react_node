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
      console.log('here saving user');
      const existedUser = await User.findOne({ googleID: profile.id });
      if (!existedUser) {
        console.log('if');
        const newUser = await new User({ googleID: profile.id }).save();
        console.log('in if');
        return done(null, newUser);
      }
      console.log('after if');
      return done(null, existedUser);
    }
  )
);
