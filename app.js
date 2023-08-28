require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGODB_CONNECTION_STRING;

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(mongoDB);
}

// authenticate with passport
const User = require('./models/user');

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      const match = await bcrypt.compare(password, user.password);

      if(!user) {
        return done(null, false, { message: "Username not found" });
      }

      if(!match) {
        return done(null, false, { message: "Incorrect password" });
      }

      return done(null, user);
    }
    catch(err) {
      return done(err);
    }
  })
)

passport.serializeUser(function(user, done) {
  done(null, user.id);
})

passport.deserializeUser(async function(id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  }
  catch(err) {
    done(err);
  }
})

const indexRouter = require('./routes/index');
const messageRouter = require('./routes/message');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const signUpRouter = require('./routes/sign_up');
const accountStatusRouter = require('./routes/account_status');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(session({ secret: "very secret secret", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/message', messageRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/sign-up', signUpRouter);
app.use('/upgrade-account', accountStatusRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
