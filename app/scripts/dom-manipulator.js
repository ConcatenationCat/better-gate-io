var betterGateIo = betterGateIo || {};
betterGateIo.domManipulator = (function() {
    'use strict';

    return {
        showStuff: showStuff
    };

    function showStuff(data) {
        var $div = $('<div></div>');
        data.headerText.each(function(index, element) {
            $('<div></div>').append(element).appendTo($div);
        });
        $('.sectioncont.mytradehistory-con').prepend($div);
    }
})();
