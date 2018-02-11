var betterGateIo = betterGateIo || {};
betterGateIo.screenScraper = (function() {
    'use strict';
    
    var cache = {};

    return {
        getTradeHistoryData: getTradeHistoryData
    };

    function getTradeHistoryData() {
        if (cache.tradeHistoryData !== undefined) {
            return cache.tradeHistoryData;
        }

        var headerText = _getHeaderText();
        var bodyText = _getBodyText();

        cache.tradeHistoryData = {
            headers: _convertRawHeaderTextToHeaders(headerText),
            history: _convertRawDataToObjects(headerText, bodyText)
        };
        return cache.tradeHistoryData;
    }

    function _convertRawHeaderTextToHeaders(headerText) {
        return _.map(headerText, function(text) {
            return {
                label: text,
                prop: _.camelCase(text)
            }
        });
    }

    function _convertRawDataToObjects(headerText, bodyText) {
        var headerTextCamelCase = _.map(headerText, _.camelCase);
        return _.map(bodyText, function(row) {
            return _.zipObject(headerTextCamelCase, row);
        });
    }

    function _getHeaderText() {
        var $tableHeader = $('.sectioncont.mytradehistory-con table.table-inacc.table-inacc-head');
        var $headers = $tableHeader.find('thead tr th');
        return $headers.map(function() {
            return $(this).text();
        });
    }

    function _getBodyText() {
        var $tableBody = $('.sectioncont.mytradehistory-con table.table-inacc.table-inacc-body');
        var $rows = $tableBody.find('tbody tr:not(.table-empty)');
        return $rows.map(function() {
            return $(this).find('td').map(function() {
                return $(this).text();
            });
        });
    }
})();
