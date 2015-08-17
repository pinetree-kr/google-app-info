'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash');
var cheerio = require('cheerio'),
	request = require('request');

/*
 * get App info. from Google Play
 */
exports.get = function(req, res){
	var pkg = req.params.package;
	var url = 'https://play.google.com/store/apps/details?id='+pkg;

	request(url, function(err, response, html){
		if(err) return res.status(401).json(err);
		if(response.statusCode/100!==2)	return res.sendStatus(response.statusCode);
		var info = {};
		var $ = cheerio.load(html);
		info.src = $('.cover-image', '.cover-container').attr('src');
		info.genre = $('span[itemprop=genre]').text();
		info.author = $('span[itemprop=name]', 'div[itemprop=author]').text();
		info.name = $('div', '.document-title[itemprop=name]').text();
		return res.status(response.statusCode).json(info);
	});
};