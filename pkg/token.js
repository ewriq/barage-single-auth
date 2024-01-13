const crypto = require('crypto');

class TokenGenerator {
  constructor(key) {
    this.key = key.toString();
  }

  gen(data) {
    const token = crypto.createHmac('sha256', this.key).update(JSON.stringify(data)).digest('hex');
    return token;
  }

  verify(token, data) {
    const ex = crypto.createHmac('sha256', this.key).update(JSON.stringify(data)).digest('hex');
    return token === ex;
  }
}

module.exports = TokenGenerator;
