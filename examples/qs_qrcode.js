'use strict';
const escpos = require('../');

const device  = new escpos.Serial("COM2");

const printer = new escpos.Printer(device);
const toto = "https://www.maisonsdumonde.com.maisonsdumonde.comehttps://www.maisonsdumonde.com.maisonsdumonde.come"
device.open(function() {
  printer.font("A").align("CT").size(1, 1).style("NORMAL").qrimage(toto, (data) => {
    console.log(data)
    printer.cut().close()
  })
  // .barcode('123456789012', 'EAN13') // code length 12
  // .barcode('109876543210') // default type 'EAN13'
  // .barcode('7654321', 'EAN8') // The EAN parity bit is automatically added.

});
