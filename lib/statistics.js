'use strict';


function statistics() {
    //
}

/**
 * Gets the upside of a stock
 *
 * @param  {float}  price   The stock price
 * @param  {float}  target  The stock target price
 * @return {float}          The stock's upside
 */
statistics.upside = function upside(price, target) {
    return ((target - price) / price) * 100;
};


module.exports = statistics;