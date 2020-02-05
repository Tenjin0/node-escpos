'use strict'
const escpos = require('..')
const command = require('../commands')
// const device = new escpos.USB()
// const device  = new escpos.USB(0x0416, 0x5011);
// const device  = new escpos.RawBT();
const device  = new escpos.Network('10.75.0.14');
// const device = new escpos.Serial('COM2')
const printer = new escpos.Printer(device)



const getStatus = (callback) => {

  device.open(function (err) {
    printer 
      // .text('EAN13 barcode example')
      .getStatus()
      // .getPrinterStatus()
      .close(callback)
  })
}

getStatus((err, data) => {
  console.log(err, data)
  setTimeout(() => {
    getStatus((err, data) => {
      console.log(err, data)
    })
  }, 100)
})

// device.on('response', data => {
//   console.log('my response', data)
// })

