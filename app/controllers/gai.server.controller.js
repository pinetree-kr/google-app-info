'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	cheerio = require('cheerio'),
	moment = require('moment'),
	mongoose = require('mongoose'),
	request = require('request');

var GAI = mongoose.model('GoogleAppInfo');
var GAIError = require('../models/gai-error.server.model');

/*
 * get App info. from Google Play
 * @params: packageName
 */
exports.show = function(req, res){
	var packageName = req.params.package;
	GAI.findOneByPackageName(packageName, function(err, app){
		if(err){
			if(err instanceof GAIError){
				return res.status(err.status).json(err);
			}else{
				return res.sendStatus(500);
			}
		}
		return res.json(app);
	});
};

/*
 * get App info. from Google Play
 * @params: packageName
 */
exports.showAll = function(req, res){
	var per_page = req.query.per_page || 5;
	var page = req.query.page || 1;

	GAI.find()
	.skip((page-1)*per_page)
	.limit(per_page)
	.exec(function(err, apps){
		if(err){
			return res.status(500).json(err.message);
		}
		return res.json(apps);
	});
};

/*
 * get App info list. from Google Play
 * @params: [packageName]
 */
exports.list = function(req, res){
	var packages = req.body.packages;
	//packages = ['com.pinetree.welldone','com.pinetree.cambus','com.kakao.talk','test.pattern.com'];
	if(packages){
		GAI.findByPackageNames(packages, function(err, apps){
			if(err){
				console.error(err);
			}
			return res.json(apps);
		});
		//return res.json(packages);
	}else{
		return res.sendStatus(428);
	}
};