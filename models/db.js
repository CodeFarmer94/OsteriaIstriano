const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('deliveryDB', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
});

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

const UserDetails = sequelize.define('UserDetails', {
  location: {
    type: DataTypes.STRING,
    defaultValue: null
  },
  age: {
    type: DataTypes.STRING,
    defaultValue: null
  },
  gender: {
    type: DataTypes.STRING,
    defaultValue: null
  }
});

const Order = sequelize.define('Order', {
  item_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
});

const Item = sequelize.define('Item', {
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false // Disable the createdAt and updatedAt columns
});

UserDetails.belongsTo(User, {
  foreignKey: 'userId',
  allowNull: false
});
User.hasOne(UserDetails, {
  foreignKey: 'userId',
  allowNull: false
});

Order.belongsTo(Item, {
  foreignKey: 'item_id',
  allowNull: false
});

// Function to insert items
const insertItems = async () => {
  try {
    await Item.bulkCreate([
      {
        category: 'Antipasti',
        name: 'Carpaccio di branzino agli agrumi',
        price: '15,00'
      },
      {
        category: 'Antipasti',
        name: 'Tartara di tonno con erba cipollina',
        price: '16,00'
      },
      {
        category: 'Antipasti',
        name: 'Gamberi al vapore con salsa al curry',
        price: '15,00'
      },
      {
        category: 'Antipasti',
        name: 'Dentice mantecato con polenta grigliata',
        price: '14,00'
      },
      {
        category: 'Antipasti',
        name: 'Antipasto misto',
        price: '18,00'
      },
      {
        category: 'Antipasti',
        name: 'Capesante gratinate al forno',
        price: '15,00'
      },
      {
        category: 'Primi piatti',
        name: 'Spaghetti alla chitarra al nero di seppia',
        price: '15,00'
      },
      {
        category: 'Primi piatti',
        name: 'Tagliolini con granzo poro alla busera',
        price: '16,00'
      },
      {
        category: 'Primi piatti',
        name: 'Orecchiette con tonno, pomodorini gialli',
        price: '15,00'
      },
      {
        category: 'Primi piatti',
        name: 'Zuppa di pesce spinata',
        price: '16,00'
      },
      {
        category: 'Secondi piatti',
        name: 'Branzino al sale',
        price: '38,00'
      },
      {
        category: 'Secondi piatti',
        name: 'Calamari* alla griglia o fritti',
        price: '15,00'
      },
      {
        category: 'Secondi piatti',
        name: 'Sardoni impanati',
        price: '13,00'
      },
      {
        category: 'Secondi piatti',
        name: 'Fritto* misto impanato del Golfo',
        price: '15,00'
      },
      {
        category: 'Secondi piatti',
        name: 'Polpo alla griglia con cipolla di Tropea grigliata',
        price: '18,00'
      },
      {
        category: 'Secondi piatti',
        name: 'Pescato del giorno alla griglia (ombrine, orate, dentici)',
        price: '20,00'
      },
      {
        category: 'Contorni',
        name: 'Insalata mista',
        price: '6,00'
      },
      {
        category: 'Contorni',
        name: 'Radicio e fasoi',
        price: '6,00'
      },
      {
        category: 'Contorni',
        name: 'Patate al forno',
        price: '6,00'
      },
      {
        category: 'Contorni',
        name: 'Verdura saltata',
        price: '6,00'
      },
      {
        category: 'Dolci e Vini',
        name: 'Dolci fatti in casa',
        price: '6,00'
      },
      {
        category: 'Dolci e Vini',
        name: 'Sorbetto',
        price: '6,00'
      },
      {
        category: 'Dolci e Vini',
        name: 'Vino della casa',
        price: '12,00'
      },
      {
        category: 'Dolci e Vini',
        name: 'Vino della casa',
        price: '12,00'
      },
      {
        category: 'Dolci e Vini',
        name: 'Acqua Dolomia',
        price: '3,00'
      },
      {
        category: 'Dolci e Vini',
        name: 'Pane e Coperto',
        price: '2,00'
      },
      {
        category: 'Dolci e Vini',
        name: 'Caffè',
        price: '2,00'
      },
      {
        category: 'Dolci e Vini',
        name: 'Amari e Liquori',
        price: '4,00'
      }
    ]);

    console.log('Items inserted successfully!');
  } catch (error) {
    console.error('Error inserting items:', error);
  }
};

// Drop tables before syncing
sequelize.sync({ force: true })
  .then(() => {
    console.log('Tables dropped and synchronized successfully.');
    insertItems();
  })
  .catch((error) => {
    console.error('Error dropping tables:', error);
  });

// Export the models
module.exports = { User, UserDetails, Order, Item };
