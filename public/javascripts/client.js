const token = localStorage.getItem('token');
const decodedToken = jwt_decode(token); // Assuming you're using a library like 'jwt-decode'
const currentTime = Math.floor(Date.now() / 1000);
if (decodedToken.exp < currentTime) {
  
}