(function (window, beacon) {
    'use strict';

    function rumtime() {
        new Image().src = beacon;
    }

    window.rumtime = rumtime;
})(window, 'http://www.REPLACE_ME_WITH_DOMAIN.com/beacon.gif');