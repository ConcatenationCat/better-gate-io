var betterGateIo = betterGateIo || {};
betterGateIo.main = (function() {
    'use strict';

    var tradeHistoryData = betterGateIo.screenScraper.getTradeHistoryData();
    betterGateIo.domManipulator.showStuff(tradeHistoryData);

    console.log('better-gate-io tradeHistoryData:', tradeHistoryData);
})();
