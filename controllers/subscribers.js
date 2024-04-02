const Subscriber = require('../models/subscriber');
const Event = require('../models/event');

const subscribersCtrl = {
    
    new: (req, res) => {
      res.render('subscribers/new'); 
    },
  
    
    create: async (req, res) => {
      try {
        
        res.send('Subscriber created successfully!');
      } catch (error) {
        res.status(500).send('Error creating subscriber: ' + error.message);
      }
    },
  
    
    addToMember: async (req, res) => {
      try {
        
        res.send('Subscriber added to event successfully!');
      } catch (error) {
        res.status(500).send('Error adding subscriber to event: ' + error.message);
      }
    }
  };
  
  
  module.exports = subscribersCtrl;