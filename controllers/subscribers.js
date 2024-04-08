const User = require('../models/user'); // Import the User model

// Display sign up form
const newSubscriber = (req, res) => {
    res.render('subscribers/new', { title: 'Sign Up' });
};

// Handle sign up form submission
const createSubscriber = async (req, res) => {
    try {
        // Extract subscriber data from the request body
        const { fullName, contactInformation, password } = req.body;

        // Check if a user with the provided email already exists
        const existingUser = await User.findOne({ email: contactInformation });
        if (existingUser) {
            return res.status(400).send('User with this email already exists');
        }

        // Create a new user in the database
        const newUser = await User.create({ fullName, email: contactInformation, password });

        // Redirect or respond with success message
        res.redirect('/success'); // Redirect to a success page
    } catch (error) {
        console.error('Error signing up user:', error);
        res.status(500).send('Error signing up user');
    }
};

// Add subscriber to an event
const addToMember = async (req, res) => {
    // Implement this function as needed
};

module.exports = {
    new: newSubscriber,
    create: createSubscriber,
    addToMember: addToMember
};
