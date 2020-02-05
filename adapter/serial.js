'use strict';
const util          = require('util');
const EventEmitter  = require('events');

/**
 * SerialPort device
 * @param {[type]} port
 * @param {[type]} options
 */
function Serial(port, options){
  var self = this;
  options = options || { 
    baudRate: 9600,
    autoOpen: false
  };
  const SerialPort = require('serialport');
  this.device = new SerialPort(port, options);
  this.device.on('close', function() {
    self.emit('disconnect', self.device);
  });


  EventEmitter.call(this);
  return this;
};

util.inherits(Serial, EventEmitter);

/**
 * open deivce
 * @param  {Function} callback
 * @return {[type]}
 */
Serial.prototype.open = function(callback){
  var self = this;
  this.device.open(function(err) {
    self.device.on('data', function(data) {
      if (data.length <= 2) {
        self.emit('_response', data)
      }
    })
    return callback && callback(err);
  });
  
  return this;
};

/**
 * write data to serialport device
 * @param  {[type]}   buf      [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
Serial.prototype.write = function(data, callback) {
  this.device.write(data, callback);
  return this;
};

/**
 * close device
 * @param  {Function} callback  [description]
 * @param  {int}      timeout   [allow manual timeout for emulated COM ports (bluetooth, ...)]
 * @return {[type]} [description]
 */
Serial.prototype.close = function(callback, data, timeout) {

  var self = this;

  this.device.drain(function() {

    self.device.flush(function(err) {
      self.device.removeAllListeners("data")
      setTimeout(function() {
        err ? callback && callback(err, data) : self.device.close(function(err) {

          if (!err && data instanceof Error) {
            err = data
            data = null
          }  
          return callback && callback(err, data);
        });

      }, "number" === typeof timeout && 0 < timeout ? timeout : 0);

    });

  });

  return this;

};

/**
 * expose
 */
module.exports = Serial;
