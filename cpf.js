const superagent = require('superagent');
const api = require('./api/currency.js');
const fs = require('fs');
const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require('constants');

const keys = JSON.parse(fs.readFileSync('keys.json', 'utf8', 'r'));
const currency = 'usd';
const symbol = '$';



(async () => {
    var balances = new Map();
    for(i in keys) {
        switch(i) {
            case 'idena': {
                var balance = 0;
                var price = (await api.getPrice(keys[i].id, currency))[keys[i].id][currency];
                for(j in keys[i].addrs) {
                    balance += await api.getBalance_IDNA(keys[i].addrs[j]) * price;
                }
                balances[i] = balance;
            } break;
            case 'binance': {
                var balance = 0;
                var price = (await api.getPrice(keys[i].id, currency))[keys[i].id][currency];
                for(j in keys[i].txs) {
                    balance += await api.getBalance_BNB(keys[i].txs[j]) * price;
                }
                balances[i] = balance;
            } break;
            case 'ethereum': {
                var balance = 0;
                var price = (await api.getPrice(keys[i].id, currency))[keys[i].id][currency];
                for(j in keys[i].addrs) {
                    balance += await api.getBalance_ETH(keys[i].addrs[j], 'apihere') * price;
                }
                balances[i] = balance;
            } break;
        }
    }
    var balance = 0;
    console.log('===========================');
    for(i in balances) {
        console.log(i + ': ' + balances[i].toFixed(2) + symbol);
        balance += balances[i];
    }
    console.log('\nTotal balance: ' + balance.toFixed(2) + symbol);
    console.log('===========================');

    console.log('Press any key to exit');

    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on('data', process.exit.bind(process, 0));
})();