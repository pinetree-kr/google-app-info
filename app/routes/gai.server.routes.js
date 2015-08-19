'use strict';

module.exports = function(app) {
	// Routing logic   
	// ...
	var gai = require('../controllers/gai.server.controller');
	
	app.route('/gai/').get(gai.showAll);
	app.route('/gai/').post(gai.list);
	app.route('/gai/:package').get(gai.show);
};