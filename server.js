const express = require("express");
const session = require("express-session");
const helmet = require('helmet');
const { check } = require("express-validator");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const LocalStrategy = require("passport-local").Strategy;
const cors = require("cors");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser"); 
const csrf = require('csurf')
const { User } = require("./models/db");
const router = require('./routes/routes')(passport);


const app = express();
const PORT = 8030;
const saltRounds = 10; // Number of salt rounds for bcrypt
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());
app.use(bodyParser.json()); // Add body-parser middleware
app.use(
  session({
    secret: "qEsa4ghmcaigxl41G",
    cookie: { maxAge: 86400000, secure: false }, // Set secure to false for development
    resave: false,
    saveUninitialized: false,
  })
);

app.use(helmet())
app.use((err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN') {
    res.status(403);
    res.send("The form was tampered with!");
  } else {
    next(err);
  }
});
app.use(passport.initialize());
app.use(passport.session());
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ where: { username: username.toLowerCase() } });
      
      if (!user) {
        return done({ message: 'User not found' }, false);
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return done({ message: 'Incorrect password' }, false);
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);


// Serialize and deserialize user objects
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

app.use('/api', router)

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
  });
  