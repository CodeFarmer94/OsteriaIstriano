const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt')
const stripe = require('stripe')('sk_test_9W1R4v0cz6AtC9PVwHFzywti')

const {User, UserDetails, Order, Item } = require('../models/db')
const saltRounds = 14;

exports.isAuthenticated = (req, res, next) => {
  console.log('Is Authenticated:', req.isAuthenticated()); // Add this line
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(403).send("Access denied");
  }
};


exports.login =  (req, res) => {
    const result = validationResult(req)
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() })
    }
    
    res.set("Access-Control-Allow-Origin", "http://localhost:3000");
    res.set("Access-Control-Allow-Credentials", "true");
    res.status(200).json({ message: "You logged in" });
  }

exports.register = async (req, res) => {
    const { username, password, name, location, surname, mobile } = req.body;
    const result = validationResult(req)
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() })
    }

    try {
      const existingUser = await User.findOne({ where: { username: username } });
      if (existingUser) {
        return res.status(409).json({ error: "L'email è già registrata" });
      }
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await User.create({
        username,
        password: hashedPassword,
      });
      const userDetails = await UserDetails.create({
        userId: user.id,
        location,
        name,
        surname,
        mobile
      });
      return  res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "An error occurred" });
    }
  }

  exports.getProfile = async (req, res) => {
    const { username } = req.user;
    // Check if the correct username is being received
    try {
      const userDetails = await UserDetails.findOne({
        attributes: { exclude: ["password"] },
        include: {
          model: User,
          where: { username },
          attributes: ["username"],
        },
      });
      if (!userDetails) {
        return res.status(404).json({ error: "User details not found" });
      }
      userDetails.username = username;
      res.status(200).json(userDetails);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  exports.modifyProfile = async (req, res) => {
    const { username } = req.user;
    const { location, name, surname, mobile } = req.body;
    const result = validationResult(req)
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() })
    }
    try {
      const user = await User.findOne({
        where: { username },
      });
      if (!user) {
        return res.status(404).json({ error: "User details not found" });
      }
      const userDetails = await UserDetails.findOne({
        where: { userId: user.id },
      });
      if (!userDetails) {
        return res.status(404).json({ error: "User details not found" });
      }
      await user.update({
        username,
      });
      await userDetails.update({
        name,
        location,
        surname,
        mobile
      });
  
      res.status(200).json({ message: JSON.stringify(user) });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
  exports.createOrder = async(req,res) => {
    const { cart, status , total, userId, time , note} = req.body
    const result = validationResult(req)
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() })
    }
    try {
     const order = await Order.create({ cart, status, total, userId, time, note})
     res.status(201).json({ message: "Order registered successfully" });
   } catch (error) {
     console.error(error);
     res.status(500).json({ error: "An error occurred" });
   }
 }
 exports.getLastOrder = async (req, res) => {
  const { username } = req.user;
  try {
    const user = await User.findOne({ where: { username: username } });

    if (!user) {
      return res.status(404).json({ error: 'Cannot find user' });
    }
    const order = await Order.findOne({
      where: { userId: user.id },
      order: [['createdAt', 'DESC']], 
    });
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).send(order);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
 exports.getAllOrdersFromUser = async (req, res) => {
  const { username } = req.user;
  try{
    const user = await User.findOne({ where: {username: username}})
    if(!user) {
      return res.status(404).json({error: 'Cannot find user'})
    }
    const order = await Order.findAll({
      where: { userId: user.id}
    })
    if(!order){
      return res.status(404).json({ error: 'Order not found'})
    }
    res.status(200).send(order)
  } catch(error) {
    res.status(500).json({ error: 'Internal server error' });
    }
 }

 exports.updateOrderStatus = async (req, res) => {
  const order = await Order.findOne({
    where: { userId: req.user.id },
    order: [['createdAt', 'DESC']],
  });
  console.log(order);
  if (order) {
    await Order.update(
      { status: 'Confirmed' },
      { where: { id: order.id } } // Provide the where condition to update the specific order
    );
    res.status(200).json({ message: 'Order status updated successfully' });
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
};


 exports.createPayment = async (req, res) => {
  const { total, title } = req.body
  const result = validationResult(req)
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() })
  }
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'eur',
          product_data: {
            name: title,
          },
          unit_amount: total*100,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'http://localhost:3000/payment',
    cancel_url: 'http://localhost:3000/payment',
  });
  res.set('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
  res.status(200).send(session.url);
}

 exports.getMenu = async(req,res) => {
  try {
    const menu = await Item.findAll()
    res.status(200).send(menu)
  } catch(err) {
    res.status(500).json({ error: 'An error occured'})
  }
 }

  exports.logout = (req, res, next)=> {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.status(200).send('Logge out')
    })};
  
    