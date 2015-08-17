'use strict';

module.exports = function(app) {
	// Routing logic   
	// ...
	var gai = require('../controllers/google-app-info.server.controller');
	app.route('/gai/:package').get(gai.get);
};