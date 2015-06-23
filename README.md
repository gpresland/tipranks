#TipRanks

Provides a simple Node library for accessing TipRanks' publicly accessible stock information for demonstration purposes.

---

##Tests

Use "mocha tests" to test all API functionality.

---

##Example Usage

var api       = require('../tipranks').api,
    analytics = require('../tipranks').analytics,
    
    Benchmark = api.BenchmarkEnum,
    Experts   = api.ExpertTypeEnum,
    Periods   = api.PeriodEnum,

    options   = {};

// Get short picks with high upside
options = {
    benchmark: Benchmark.SNP,
    period: Periods.OneMonth,
    minChange: 20,
    minUpside: 20,
    sort: 'upside'
};


analytics.getMostRecommendedStocks(options).then(function (stocks) {
    console.dir(stocks);
});