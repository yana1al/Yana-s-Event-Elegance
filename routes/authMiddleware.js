// authmiddleware.js
function isAuthenticated(req, res, next) {
    // Check if the user is authenticated, for example, using Passport.js or any other authentication mechanism
    if (req.isAuthenticated()) {
      // If authenticated, proceed to the next middleware or route handler
      return next();
    } else {
      // If not authenticated, redirect the user to the login page or send an error response
      res.redirect('/login'); // Modify this according to your application's login route
    }
  }
  
  module.exports = { isAuthenticated };
  