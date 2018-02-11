var betterGateIo = betterGateIo || {};
betterGateIo.myHistoryController = (function() {
    'use strict';

    var tradeHistoryData;

    function setJQueryOuterHtml($element) {
        $.fn.outerHtml = function(s) {
            return s ? this.before(s).remove() : $("<div></div>").append(this.eq(0).clone()).html();
        }
    }

    function setJQueryObjects() {
        betterGateIo.$ = {
            betterDiv: $('<div></div>').addClass('better-gate-io my-history better-div'),
            tableHeader: $('.sectioncont.mytradehistory-con table.table-inacc.table-inacc-head'),
            tableBody: $('.sectioncont.mytradehistory-con table.table-inacc.table-inacc-body')
        };
        betterGateIo.$.tableScrollDiv = betterGateIo.$.tableBody.closest('div.table-scroll');
        $('.sectioncont.mytradehistory-con').prepend(betterGateIo.$.betterDiv);
    }

    function showStuff(data) {
        var $headersUl = $('<ul></ul>').appendTo(betterGateIo.$.betterDiv);
        _.forEach(data.headers, function(header) {
            $('<li></li>').append(header.label + ': ' + header.prop).appendTo($headersUl);
        });
    }

    function setTableBody(rows) {
        betterGateIo.$.tableBody.html(_.map(rows, function(row) {
            return row.$row.outerHtml();
        }));
    }

    function init() {
        setJQueryOuterHtml();
        setJQueryObjects();
        betterGateIo.screenScraper.markElements();
        tradeHistoryData = betterGateIo.screenScraper.getTradeHistoryData();

        showStuff(tradeHistoryData);
        console.log('better-gate-io tradeHistoryData:', tradeHistoryData);

        var mod01 = _.clone(tradeHistoryData);
        mod01.history.push(_.clone(mod01.history[0]));
        // _.sortBy(mod01, function(obj) {

        // });
        setTableBody(mod01.history);
    }
    init();
})();
