const bcrypt = require('bcrypt')


const {User, UserDetails, Order, Item }= require('../models/db')
const saltRounds = 14;

exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.status(403).send("Access denied");
    }
  }

exports.login =  (req, res) => {
    console.log("login sucessful");
    console.log(req.user);
    res.set("Access-Control-Allow-Origin", "http://localhost:3000");
    res.set("Access-Control-Allow-Credentials", "true");
    res.status(200).json({ message: "You logged in" });
  }

exports.register = async (req, res) => {
    const { username, email, password, age, location, gender } = req.body;
    try {
      const existingUser = await User.findOne({ where: { email: email } });
      if (existingUser) {
        return res.status(409).json({ error: "User already exists" });
      }
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = await User.create({
        username,
        email,
        password: hashedPassword,
      });
      const userDetails = await UserDetails.create({
        userId: user.id,
        location,
        age,
        gender,
      });
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred" });
    }
  }

  exports.getProfile = async (req, res) => {
    const { username, email } = req.user;
    // Check if the correct username is being received
    try {
      const userDetails = await UserDetails.findOne({
        attributes: { exclude: ["password"] },
        include: {
          model: User,
          where: { username },
          attributes: ["username", "email"],
        },
      });
      if (!userDetails) {
        return res.status(404).json({ error: "User details not found" });
      }
      userDetails.username = username;
      userDetails.email = email;
      res.status(200).json(userDetails);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  exports.createOrder = async(req,res) => {
    const { item_id, quantity, total} = req.body
    try {
     const order = await Order.create({ item_id, quantity, total})
     res.status(201).json({ message: "User registered successfully" });
   } catch (error) {
     console.error(error);
     res.status(500).json({ error: "An error occurred" });
   }
 }

 exports.getMenu = async(req,res) => {
  try {
    const menu = await Item.findAll()
    res.status(200).send(menu)
  } catch(err) {
    res.status(500).json({ error: 'An error occured'})
  }
 }

  exports.logout = (req, res) => {
    req.logout(() => {
      res.redirect("/");
    })
    }