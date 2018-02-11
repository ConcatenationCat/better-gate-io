var betterGateIo = betterGateIo || {};
betterGateIo.myHistoryCalculator = (function() {
    'use strict';
    
    return {
        calculateAveragePrices: calculateAveragePrices
    };

    function calculateAveragePrices(trades) {
        var totals = _.transform(trades, function(acc, trade) {
            acc[trade.type] = acc[trade.type] || {
                amount: 0,
                total: 0
            };

            var amount = _parseAmount(trade.amount);
            var total = _parseAmount(trade.total);
            if (amount !== null && total !== null) {
                acc[trade.type].amount += amount.amount;
                acc[trade.type].total += total.amount;
            }
        }, {});

        return _.mapValues(totals, function(total) {
            return total.total / total.amount;
        })
    }

    function _parseAmount(s) {
        var info = /^([\d,\.]+) ([A-Z]+)$/g.exec(s);
        if (!_.isArray(info) || info.length != 3) {
            return null;
        }

        return {
            amount: parseFloat(info[1].replace(/,/g, '')),
            currency: info[2]
        }
    }
})();
