'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	async = require('async'),
	cheerio = require('cheerio'),
	moment = require('moment'),
	request = require('request')
	;

var GAIError = require('../models/gai-error.server.model');
/**
 * AppInfo Schema
 */
var GoogleAppInfoSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	packageName: {
		type: String,
		required: true,
	},
	img_url: String,
	genre: String,
	author: String,
	updated: Number,
});

/**
 * Find App Info Inside Server
 */
GoogleAppInfoSchema.statics.findOneByPackageName = function(packageName, callback) {
	var self = this;
	async.waterfall([
		function(next){
			self.findOne({
				packageName: packageName
			}, next);
		},function(app, next){
			if(app) return callback(null, app);
			else return next(null, app);
		},function(app, next){
			self.getAppInfoFromGooglePlay(packageName, next);
		}
	], function(err, result){
		if(err) console.error(err);
		return callback(err, result);
	});
};

/**
 * Find Apps Info Inside Server
 */
GoogleAppInfoSchema.statics.findByPackageNames = function(packages, callback) {
	var self = this;

	async.mapSeries(packages, function(packageName, next){
		self.findOne({
			packageName: packageName
		}, function(err, item){
			if(err) return next(err);
			if(item){
				return next(null, item);
			}else{
				self.getAppInfoFromGooglePlay(packageName, function(err, result){
					if(err || !result){
						return next(null, {
							packageName: packageName,
							error: 1,
							message: err.message || 'Not Found Package'
						});
					}else{
						return next(null, result);
					}
				});
			}
		});
	}, callback);
};


/**
 * Find App Info Outside Server
 */
GoogleAppInfoSchema.statics.getAppInfoFromGooglePlay = function(packageName, callback) {
	var url = 'https://play.google.com/store/apps/details?id='+packageName;
	var info = new this();

	async.waterfall([
		function(next){
			request(url, function(err, response, html){
				if(!err){
					if(response.statusCode/100!==2){
						err = new GAIError('Invalid package ['+packageName+'] or Server has changed service',response.statusCode);
					}
				}
				return next(err, html);
			});
		},
		function(html, next){
			var $ = cheerio.load(html);
			info.name = $('div', '.document-title[itemprop=name]').text();
			info.packageName = packageName;
			info.img_url = $('.cover-image', '.cover-container').attr('src');
			info.genre = $('span[itemprop=genre]').text();
			info.author = $('span[itemprop=name]', 'div[itemprop=author]').text();
			info.updated = moment($('.content[itemprop=datePublished]').text(),'YYYY년 MM월 DD일').valueOf();
			info.save(next);
		}
	], function(err, result){
		if(err) console.error(err);
		return callback(err, result);
	});
};

mongoose.model('GoogleAppInfo', GoogleAppInfoSchema);
