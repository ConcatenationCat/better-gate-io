var betterGateIo = betterGateIo || {};
betterGateIo.myHistoryController = (function() {
    'use strict';

    var tradeHistoryData;
    var originalTableScrollDivHeight;

    _init();

    function _init() {
        _setJQueryOuterHtml();
        _setJQueryObjects();
        betterGateIo.screenScraper.markElements();
        tradeHistoryData = betterGateIo.screenScraper.getTradeHistoryData();

        // _showStuff(tradeHistoryData);
        // console.log('better-gate-io tradeHistoryData:', tradeHistoryData);
        
        _addPairFilterInput();
        _updateInfoDisplay();
    }

    function _setJQueryOuterHtml($element) {
        $.fn.outerHtml = function(s) {
            return s ? this.before(s).remove() : $("<div></div>").append(this.eq(0).clone()).html();
        }
    }

    function _setJQueryObjects() {
        betterGateIo.$ = {
            tableHeader: $('.sectioncont.mytradehistory-con table.table-inacc.table-inacc-head'),
            tableBody: $('.sectioncont.mytradehistory-con table.table-inacc.table-inacc-body'),
            betterDiv: $('<div></div>').addClass('better-gate-io my-history better-div'),
            pairFilterSelect: $('<select></select>').addClass('pair-filter-select'),
            infoDisplay: $('<div></div>').addClass('info-display')
        };
        betterGateIo.$.tableScrollDiv = betterGateIo.$.tableBody.closest('div.table-scroll');
        $('.sectioncont.mytradehistory-con').prepend(betterGateIo.$.betterDiv);
    }

    function _addPairFilterInput() {
        betterGateIo.$.betterDiv.append(betterGateIo.$.infoDisplay);
        var $pairFilterInputDiv = $('<div></div>').addClass('pair-filter-container');
        $pairFilterInputDiv.append($('<h4></h4>').text('Pair filter'));
        $pairFilterInputDiv.append(betterGateIo.$.pairFilterSelect);
        betterGateIo.$.betterDiv.append($pairFilterInputDiv);

        var defaultOptionString = 'no filter';
        var pairs = [defaultOptionString].concat(_.sortBy(_.uniq(_.map(tradeHistoryData.history, 'pair'))));
        $.each(pairs, function(index, pair) {
            var $option = $('<option></option>').append(pair);
            if (index === 0) {
                $option.attr('value', '');
            }
            betterGateIo.$.pairFilterSelect.append($option);
        });

        betterGateIo.$.pairFilterSelect.change(function() {
            var $select = $(this);
            if ($select.val() === '') {
                _setTableBody(tradeHistoryData.history);
                _updateInfoDisplay();
                return;
            }

            var displayHistory = _.filter(_.clone(tradeHistoryData.history), {pair: $select.val()});
            _setTableBody(displayHistory);
            _updateInfoDisplay(displayHistory);
        });
    }

    function _updateInfoDisplay(trades) {
        betterGateIo.$.infoDisplay.empty();
        if (betterGateIo.$.pairFilterSelect.val() === '') {
            _setTableScrollDivHeight();
            return;
        }

        var pair = betterGateIo.$.pairFilterSelect.val().split('/');
        if (pair.length !== 2) {
            _setTableScrollDivHeight();
            return;
        }

        $('<h4></h4>').append('Info').appendTo(betterGateIo.$.infoDisplay);
        var averagePrices = betterGateIo.myHistoryCalculator.calculateAveragePrices(trades);
        var $ul = $('<ul></ul>');
        betterGateIo.$.infoDisplay.append($ul);
        _.forEach(averagePrices, function(averagePrice, type) {
            var $li = $('<li></li>');
            $ul.append($li);
            $li.append('Average type "' + type + '": ' + averagePrice + ' ' + pair[1]);
        });
        _setTableScrollDivHeight();
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
        if (originalTableScrollDivHeight === undefined) {
            var originalTableScrollDivHeightProperty = betterGateIo.$.tableScrollDiv.css('height'); // sample result: '600px'
            var info = /^(\d+)px$/g.exec(originalTableScrollDivHeightProperty);
            if (!_.isArray(info) || info.length < 2) {
                return;
            }
            originalTableScrollDivHeight = info[1]; // sample result: 600
        }

        var betterDivHeight = betterGateIo.$.betterDiv.outerHeight(true); // sample result: 100
        var myTableScrollDivHeight = originalTableScrollDivHeight - betterDivHeight;
        betterGateIo.$.tableScrollDiv.css('height', myTableScrollDivHeight);
    }
})();
