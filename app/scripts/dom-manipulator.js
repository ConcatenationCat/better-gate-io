var betterGateIo = betterGateIo || {};
betterGateIo.domManipulator = (function() {
    'use strict';

    return {
        showStuff: showStuff
    };

    function showStuff(data) {
        var $div = $('<div></div>');

        var $headersUl = $('<ul></ul>').appendTo($div);
        _.forEach(data.headers, function(header) {
            $('<li></li>').append(header.label + ': ' + header.prop).appendTo($headersUl);
        });

        // var $bodyUl = $('<ul></ul>').appendTo($div);
        // _.forEach(data.history, function(row) {
        //     var $rowUl = $('<ul></ul>').appendTo($bodyUl);
        //     _.forEach(row, function(cell) {
        //         $('<li></li>').append(cell).appendTo($rowUl);
        //     });
        // });

        $('.sectioncont.mytradehistory-con').prepend($div);
    }
})();
