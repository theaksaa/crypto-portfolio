const superagent = require('superagent');


module.exports.getPrice = async function getIDNA(ids, currencies) {
    return new Promise(function (resolve, reject) {
        superagent.get('https://api.coingecko.com/api/v3/simple/price?ids=' + ids + '&vs_currencies=' + currencies)
            .end((err, res) => {
                if (err) return reject(err);
                resolve(res.body);
            }
        );
    });
}

module.exports.getBalance_IDNA = async function getBalance_IDNA(addr) {
    return new Promise(function (resolve, reject) {
        superagent.get('https://api.idena.io/api/Address/' + addr)
            .end((err, res) => {
                if (err) return reject(err);
                resolve(parseFloat(res.body.result.balance));
            }
        );
    });
}

module.exports.getBalance_ETH = async function getBalance_ETH(addr, api) {
    return new Promise(function (resolve, reject) {
        superagent.get('https://api.etherscan.io/api?module=account&action=balance&address=' + addr + '&tag=latest&apikey=' + api)
            .end((err, res) => {
                if (err) return reject(err);
                resolve(parseFloat(res.body.result /10e17));
            }
        );
    });
}

module.exports.getBalance_BNB = async function getBalance_BNB(tx) {
    return new Promise(function (resolve, reject) {
        superagent.get('https://dex.binance.org/api/v1/tx/' + tx + '?format=json')
            .end((err, res) => {
                if (err) return reject(err);
                resolve(parseFloat(res.body.tx.value.msg[0].value.inputs[0].coins[0].amount / 10e7));
            }
        );
    });
}

module.exports.calculate = async function calculate(keys) {
    
}