var betterGateIo = betterGateIo || {};
betterGateIo.screenScraper = (function() {
    'use strict';
    
    var cache = {};

    return {
        markElements: markElements,
        getTradeHistoryData: getTradeHistoryData
    };

    function markElements() {
        var $rows = betterGateIo.$.tableBody.find('tbody tr:not(.table-empty)');
        $rows.addClass('better-gate-io bodyRow');
        $rows.each(function(index) {
            $(this).data('original-index', index);
            $(this).attr('data-original-index', index);
        });
    }

    function getTradeHistoryData() {
        if (cache.tradeHistoryData !== undefined) {
            return cache.tradeHistoryData;
        }

        var headerText = _getHeaderText();
        cache.tradeHistoryData = {
            headers: _convertRawHeaderTextToHeaders(headerText),
            history: _getBodyData(headerText)
        };
        return cache.tradeHistoryData;
    }

    function _getHeaderText() {
        var $headers = betterGateIo.$.tableHeader.find('thead tr th');
        return $headers.map(function() {
            return $(this).text();
        });
    }

    function _convertRawHeaderTextToHeaders(headerText) {
        return _.map(headerText, function(text) {
            return {
                label: text,
                prop: _.camelCase(text)
            }
        });
    }

    function _getBodyData(headerText) {
        var $rows = betterGateIo.$.tableBody.find('tbody tr:not(.table-empty)');
        var headerTextCamelCase = _.map(headerText, _.camelCase);
        return $rows.map(function(index) {
            var $row = $(this)
            var rowText = $row.find('td').map(function() {
                return $(this).text();
            });
            var obj = _.zipObject(headerTextCamelCase, rowText);
            obj.originalIndex = $row.data('original-index');
            obj.$row = $row;
            return obj;
        });
    }
})();
