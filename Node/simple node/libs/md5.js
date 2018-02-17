const crypto = require('crypto');
const hash = crypto.createHash('md5');

module.exports = {
    md5_suffix: 'Beats0',
    md5: function (str) {
        let obj = crypto.createHash('md5');
        obj.update(str);
        return obj.digest('hex');
    }
};

hash.update('111111'+'Beats0');
console.log(hash.digest('hex'));