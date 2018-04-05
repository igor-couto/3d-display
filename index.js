let app = require('./config/custom-express')();
const door = 80;

// Start Server
app.listen(door, () => {
	console.log('- Server running and listening on door '+ door + '...');
});