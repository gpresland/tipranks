var assert     = require('assert'),
    api        = require('../index').api,

    Benchmarks = api.BenchmarkEnum,
    Experts    = api.ExpertTypeEnum,
    Periods    = api.PeriodEnum;


describe('Test API requests', function () {
    this.timeout(30000);
    it('api/stocks/getData', function (done) {
        api.getData('TWTR', Benchmarks.None, Periods.OneMonth).then(function (data) {
            if (Object.keys(data).length) {
                done();
            } else {
                done(new Error('Empty or non JSON results'));
            }
        });
    });
    it('api/stockInfo/getDetails', function (done) {
        api.getDetails(['TWTR', 'GOOG', 'MSFT']).then(function (data) {
            if (typeof data === 'object' && data.length) {
                done();
            } else {
                done(new Error('Empty or non JSON results'));
            }
        });
    });
    it('api/stocks/getMostRecommendedStocks', function (done) {
        api.getMostRecommendedStocks(Benchmarks.None, Periods.OneMonth).then(function (data) {
            if (Object.keys(data).length) {
                done();
            } else {
                done(new Error('Empty or non JSON results'));
            }
        });
    });
    it('api/experts/getTop', function (done) {
        api.getTop(10, Experts.Analyst, Periods.OneMonth).then(function (data) {
            if (Object.keys(data).length) {
                done();
            } else {
                done(new Error('Empty or non JSON results'));
            }
        });
    });
    it('api/liveFeeds/getTop', function (done) {
        api.getTop(10, Benchmarks.None, Experts.Analyst, Periods.OneMonth).then(function (data) {
            if (Object.keys(data).length) {
                done();
            } else {
                done(new Error('Empty or non JSON results'));
            }
        });
    });
});

//describe('Test analytics', function () {
//    it('', function (done) {
//        //
//    });
//});