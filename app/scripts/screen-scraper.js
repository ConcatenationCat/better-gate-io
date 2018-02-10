var betterGateIo = betterGateIo || {};
betterGateIo.screenScraper = (function() {
    'use strict';

    return {
        getTradeHistoryData: getTradeHistoryData
    };

    function getTradeHistoryData() {
        return {
            headerText: getHeaderText()
        };
    }

    function getHeaderText() {
        var $tableHeader = $('.sectioncont.mytradehistory-con table.table-inacc.table-inacc-head');
        var $headers = $tableHeader.find('thead tr th');
        return $headers.map(function() {
            return $(this).text();
        });
    }
})();
