var betterGateIo = betterGateIo || {};
betterGateIo.main = (function() {
    'use strict';

    var content = betterGateIo.screenScraper.getTradeHistoryData();
    betterGateIo.domManipulator.showStuff(content);
})();
