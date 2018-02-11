var betterGateIo = betterGateIo || {};
betterGateIo.myHistoryController = (function() {
    'use strict';

    var tradeHistoryData;

    _init();

    return {
    };

    function _init() {
        _setJQueryOuterHtml();
        _setJQueryObjects();
        betterGateIo.screenScraper.markElements();
        tradeHistoryData = betterGateIo.screenScraper.getTradeHistoryData();

        _showStuff(tradeHistoryData);
        console.log('better-gate-io tradeHistoryData:', tradeHistoryData);

        var mod01 = _.clone(tradeHistoryData);
        mod01.history.push(_.clone(mod01.history[0]));
        // _.sortBy(mod01, function(obj) {

        // });
        _setTableBody(mod01.history);
        _setTableScrollDivHeight();
    }

    function _setJQueryOuterHtml($element) {
        $.fn.outerHtml = function(s) {
            return s ? this.before(s).remove() : $("<div></div>").append(this.eq(0).clone()).html();
        }
    }

    function _setJQueryObjects() {
        betterGateIo.$ = {
            betterDiv: $('<div></div>').addClass('better-gate-io my-history better-div'),
            tableHeader: $('.sectioncont.mytradehistory-con table.table-inacc.table-inacc-head'),
            tableBody: $('.sectioncont.mytradehistory-con table.table-inacc.table-inacc-body')
        };
        betterGateIo.$.tableScrollDiv = betterGateIo.$.tableBody.closest('div.table-scroll');
        $('.sectioncont.mytradehistory-con').prepend(betterGateIo.$.betterDiv);
    }

    function _addPairFilterInput() {

    }

    function _showStuff(data) {
        var $headersUl = $('<ul></ul>').appendTo(betterGateIo.$.betterDiv);
        _.forEach(data.headers, function(header) {
            $('<li></li>').append(header.label + ': ' + header.prop).appendTo($headersUl);
        });
    }

    function _setTableBody(rows) {
        betterGateIo.$.tableBody.html(_.map(rows, function(row) {
            return row.$row.outerHtml();
        }));
    }

    function _setTableScrollDivHeight() {
        var currentTableScrollDivHeightProperty = betterGateIo.$.tableScrollDiv.css('height'); // sample result: '600px'
        var info = /^(\d+)px$/g.exec(currentTableScrollDivHeightProperty);
        if (!_.isArray(info) || info.length < 2) {
            return;
        }

        var currentTableScrollDivHeight = info[1]; // sample result: 600
        var betterDivHeight = betterGateIo.$.betterDiv.outerHeight(true); // sample result: 100
        var myTableScrollDivHeight = currentTableScrollDivHeight - betterDivHeight;
        betterGateIo.$.tableScrollDiv.css('height', myTableScrollDivHeight);
    }
})();
