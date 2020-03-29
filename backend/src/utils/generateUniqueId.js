const crypto = require('crypto');

module.exports = function generate(){
    return crypto.randomBytes(4).toString('HEX');
}