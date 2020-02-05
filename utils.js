/**
 * [getParityBit description]
 * @return {[type]} [description]
 */
exports.getParityBit = function (str) {
  var parity = 0, reversedCode = str.split('').reverse().join('');
  for (var counter = 0; counter < reversedCode.length; counter += 1) {
    parity += parseInt(reversedCode.charAt(counter), 10) * Math.pow(3, ((counter + 1) % 2));
  }
  return String((10 - (parity % 10)) % 10);
};

exports.codeLength = function (str) {
  let buff = Buffer.from((str.length).toString(16), 'hex');
  return buff.toString();
}


exports.parsePrinterStatusResponse = function(hex) {
  const binary = parseInt(hex, 16).toString(2).padStart(8, "0")
  const parsed = {
    printer_online: binary[4] === "0" ? true : false,
    waiting_for_online_recovery: binary[2] === "1" ? true : false,
    cashdrawer_pin: binary[5] === "1" ? 'high' : "low",
    paper_being_feed: binary[1] === "1" ? true : false
  }

  return parsed
}

exports.parseOnlineStatusResponse = function(hex) {
  const binary = parseInt(hex, 16).toString(2).padStart(8, "0")
  const parsed = {
    cover_opened: binary[5] === "1" ? true : false,
    paper_end: binary[2] === "1" ? true: false,
    error_occured: binary[1] === "1" ? true : false,
    paper_being_feed: binary[4] === "1" ? true : false,
  }

  return parsed
}