'use strict';


function statistics() {
    //
}


statistics.upside = function upside(price, target) {
    return ((target - price) / price) * 100;
};


module.exports = statistics;