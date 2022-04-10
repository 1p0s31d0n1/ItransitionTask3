const rand = require('csprng');
const crypto = require("crypto");

class Hmac {
    key;
    move;
    constructor(move) {
        this.move = move;
        this.key = this.generateKey();
    }

     generateKey() {
        return rand(256,16);
    }

    generateHMAC() {
        return crypto.createHmac('sha256', this.key).update(this.move).digest('hex');
    }
}

module.exports = Hmac;