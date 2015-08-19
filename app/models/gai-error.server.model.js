'use strict';

function GAIError(msg, status){
  Error.call(this);
  Error.captureStackTrace(this, this.constructor);
  this.message = msg;
  this.status = status || 500;
  this.name = 'GAIError';
}

GAIError.prototype = Object.create(Error.prototype);
GAIError.prototype.constructor = Error;


exports = module.exports = GAIError;