const crypto = require('crypto');

const secret = 'sadf247^@&*!';

//密码加密
const setCrypto = (str) => {
    return crypto.createHmac('sha256', secret)
        .update(str)
        .digest('hex');
}

module.exports = {
    setCrypto
}