
const Review = require('../models/review');

exports.create = async (req, res) => {
  try {
    
    const newReview = new Review({
      content: req.body.content,
      rating: req.body.rating,
      
    });

    
    await newReview.save();

    
    res.status(201).send('Review created successfully!');
  } catch (err) {
    
    console.error('Error creating review:', err);
    res.status(500).send('Error creating review. Please try again later.');
  }
};
