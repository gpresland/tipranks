'use strict';


var async = require('async'),
    Q     = require('q'),
    api   = require('./apis'),
    sorts  = require('./sorts'),
    stats = require('./statistics');


function analytics() {
    //
}

/**
 * Get most recommended stocks
 *
 * @param  {object}  [options=null]       Optional settings
 * @param  {int}     [options.benchmark]  Enum benchmark
 * @param  {int}     [options.period]     Enum period
 * @return {object}                       Returns a promise object with results
 */
analytics.getMostRecommendedStocks = function getMostRecommendedStocks(options) {
    
    var benchmark = options.benchmark || api.BenchmarkEnum.None,
        period    = options.period    || api.PeriodEnum.OneMonth,
        
        minChange = options.minChange || null,
        minUpside = options.minUpside || null,
        age       = options.age       || null,
        
        sort      = options.sort      || null;
    
    
    var deferred  = Q.defer();
    
    api.getMostRecommendedStocks(benchmark, period).then(function (stocks) {
        
        var recommendedStocks = [];
        
        stocks.forEach(function (stock) {
            
            var change = stats.upside(stock.recentStockBehaviour[0], stock.recentStockBehaviour[stock.recentStockBehaviour.length - 1]),
                upside = stats.upside(stock.price, stock.priceTarget);
            
            if (stock.reason.rating === 'BUY' &&
               (change >= minChange || minChange === null) &&
               (upside >= minUpside || minUpside === null)) {
                
                recommendedStocks.push({
                    date: stock.rLastRating,
                    price: stock.price,
                    priceTarget: stock.priceTarget,
                    ticker: stock.ticker,
                    change: change,
                    upside: upside
                });
            }
        });
        
        if (sort !== null) {
            recommendedStocks.sort(sorts.dynamic(sort));
        }
        
        deferred.resolve(recommendedStocks);
    });
    
    return deferred.promise;
};

/**
 * Get (n)umber of top analysts, then find what recommended stocks they have in common
 *
 * @param  {int}     n  The number of most recommended stocks to request
 * @return {object}     Returns a promise with object containing buys, holds, and sells properties.
 */
analytics.getTopAnalystsRecommendations = function getTopAnalystsRecommendations(n) {
    
    var deferred;
    
    deferred = Q.defer();
    
    api.getTopAnalysts(n).then(function (data) {
        
        var buys, holds, sells, topAnalysts;
        
        buys = {};
        holds = {};
        sells = {};
        
        // Get list of top analysts
        topAnalysts = data.map(function (analyst) {
            return analyst.name;
        });
        
        // For each analyst, get their top stock picks
        async.eachLimit(topAnalysts, 5, function (name, callback) {
            api.getStocks(name, api.PeriodEnum.ThreeMonths).then(function (data) {
                data.forEach(function (stock) {
                    if (stock.latestRating.rating === "Buy") {
                        buys[stock.ticker] = (buys.hasOwnProperty(stock.ticker)) ? buys[stock.ticker] + 1 : 1;
                    } else if (stock.latestRating.rating === "Hold") {
                        holds[stock.ticker] = (holds.hasOwnProperty(stock.ticker)) ? holds[stock.ticker] + 1 : 1;
                    } else if (stock.latestRating.rating === "Sell") {
                        sells[stock.ticker] = (sells.hasOwnProperty(stock.ticker)) ? sells[stock.ticker] + 1 : 1;
                    }
                });
                callback();
            });
        }, function (err) {
            buys = sort.object(buys);
            holds = sort.object(holds);
            sells = sort.object(sells);
            deferred.resolve({
                buys: buys,
                holds: holds,
                sells: sells
            });
        });
    });
    
    return deferred.promise;
};


module.exports = analytics;