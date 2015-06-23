// ------------------------------------------------------------------------------------------------------------------------
// getData
//
// Description:     Gets data for a specific stock symbol.
// API:             https://www.tipranks.com/api/stocks/getData/<ticker>/?benchmark=<benchmark>&period=<period>
// Params:          ticker      - str:
//                  benchmark   - int: > 1
//                  period      - int: > 1
//
// ------------------------------------------------------------------------------------------------------------------------
// getDetails
//
// Description:     Get details about a single or list of stocks.
// API:             https://www.tipranks.com/api/stockInfo/getDetails/?name=<name>
// Params:          name        - str: one or more stock symbols separated by commas (e.g. twtr or twtr,aapl,intl)
//
// ------------------------------------------------------------------------------------------------------------------------
// getMostRecommendedStocks
//
// Description:     Get recommendations.  
// API:             https://www.tipranks.com/api/stocks/getMostRecommendedStocks/?benchmark=<benchmark>&period=<period>
// Params:          benchmark   - int: > 1
//                  period      - int: > 1
//
// ------------------------------------------------------------------------------------------------------------------------
// getTop
//
// Description:     Get top recommendations.  
// API:             https://www.tipranks.com/api/experts/getTop/?benchmark=<benchmark>&experttype=<expert type>&period=<period>&top=<top>
// Params:          benchmark   - int: > 1
//                  experttype  - int: > 1
//                  period      - int: > 1
//
// ------------------------------------------------------------------------------------------------------------------------
// getInfo
//
// Description:     Get information about an investor.  
// API:             https://www.tipranks.com/api/experts/getInfo/?benchmark=<benchmark>&name=<first-last>&period=<period>
// Params:          benchmark   - int: > 1
//                  name        - str:
//                  period      - int: > 1
//
// ------------------------------------------------------------------------------------------------------------------------
// getStocks
//
// Description:     Get stock recommendations by investor. 
// API:             https://www.tipranks.com/api/experts/getStocks/?benchmark=<benchmark>&name=<first-last>&period=<period>
// Params:          benchmark   - int: > 1
//                  name        - str:
//                  period      - int: > 1
//
// ------------------------------------------------------------------------------------------------------------------------
// getHistoricalPrice
//
// Description:     Get historical stocks prices.
// API:             https://www.tipranks.com/api/stocks/getHistoricalPrice/<ticker>/?daysBack=<days back>
// Params:          ticker      - str:
//                  daysBack    - int: > 1 or 99999 for all
//
// ------------------------------------------------------------------------------------------------------------------------
// getPrice
//
// Description:     Get current stock price.
// API:             https://www.tipranks.com/api/stocks/getPrice?ticker=<ticker>
// Params:          ticker      - str:
//
// ------------------------------------------------------------------------------------------------------------------------


'use strict';


var http  = require('http'),
    Q     = require('q');


function Api() {
    //
}


Api.ExpertTypeEnum = {
    Analyst: 1,
    Blogger: 3,
    Insider: 7
};

Api.BenchmarkEnum = {
    SNP: 1,
    None: 2,
    Sector: 3
};

Api.PeriodEnum = {
    OneMonth: 1,
    ThreeMonths: 2,
    OneYear: 3,
    TwoYears : 4
};

Api.SectorEnum = {
    BasicMaterials: 17343,
    ConsumerGoods: 18731,
    Financial: 17346,
    Healthcare: 17347,
    IndustrialGoods: 17348,
    Services: 17350,
    Technology: 17349,
    Utilities: 17351
};


/**
 * Gets a JSON document from a tiprank.com URL
 *
 * @param  {string}  path  The tipranks.com URL path
 * @return {object}        Returns a promise
 */
function get(path) {
    var deferred, request;
    request = {
        host: 'www.tipranks.com',
        port: 80,
        path: path,
        method: 'GET',
        headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.8',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Cookie': 'km_ai=H6mQxlVJ9XolIqgv7y2Sxxucq7A%3D; km_lv=x; _ok=3619-807-10-1553; _okac=0bb0cb63bc275f58d013c72a145bfeb0; _okla=1; D_SID=216.8.167.158:UkN1PckDQJgya0iDdj0UgeIZSDN+DuJ/f/Bjp+5yYjg; D_PID=65B66C68-6EC9-3B18-99EC-5F2B8F8D3C20; D_IID=8E492DE5-0A65-3F7F-AE41-ECF61FD54D24; D_UID=BEA4C826-7682-3D9F-A1D1-4F8C688DC0F0; D_HID=smpi00bomnDBgeVMi1AFuppRA9IBuN+9BXSzXsOThOo; country=United States; city=Virginia; ARRAffinity=0c9d0a17f3c1175b11baa160eec9bfd5119e530f0b22782df9c320cfbf0dd511; _ga=GA1.2.853938557.1422025580; olfsk=olfsk9159904685802758; _okbk=cd4%3Dtrue%2Cwa1%3Dfalse%2Cvi5%3D0%2Cvi4%3D1425991597392%2Cvi3%3Dactive%2Cvi2%3Dfalse%2Cvi1%3Dfalse%2Ccd8%3Dchat%2Ccd6%3D0%2Ccd5%3Daway%2Ccd3%3Dfalse%2Ccd2%3D0%2Ccd1%3D0%2C; wcsid=jlUzNdqpQzQpbo873t19I9Z3JTpLDyVV; hblid=bKX0IswkV5YAlJRR3t19IuAJJUD1pCk1; kvcd=1425991598295; km_uq=; _oklv=1425999368306%2CjlUzNdqpQzQpbo873t19I9Z3JTpLDyVV',
            'DNT': '1',
            'Host': 'www.tipranks.com',
            'Pragma': 'no-cache',
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.115 Safari/537.36'
        }
    };
    deferred = Q.defer();
    http.get(request, function (res) {
        var html = '';
        res.on('data', function (chunk) {
            html += chunk;
        });
        res.on('end', function () {
            try {
                deferred.resolve(JSON.parse(html));
            } catch (e) {
                deferred.resolve(null);
            }
        });
    });
    return deferred.promise;
}


/**
 * Gets stock ticker symbol information
 *
 * @param  {string}  symbol     The stock ticker symbol
 * @param  {int}     benchmark  The benchmark type ENUM
 * @param  {int}     period     The period type ENUM
 * @return {object}            Returns a promise
 */
Api.getData = function getData(symbol, benchmark, period) {
    benchmark  = benchmark  || Api.BenchmarkEnum.None;
    period     = period     || Api.PeriodEnum.OneYear;
    return get('/api/stocks/getData/' + symbol + '/?benchmark=' + benchmark + '&period=' + period);
};

/**
 * Gets details about a stock symbol
 *
 * @param  {string}  symbol  The stock ticker symbol
 * @return {array}           Returns a promise with array
 */
Api.getDetails = function getDetails(symbols) {
    var query;
    if (symbols.constructor === Array) {
        query = symbols.join(',');
    } else {
        query = symbols;
    }
    return get('/api/stockInfo/getDetails/?name=' + query);
};

/**
 * Get most recommended stock
 *
 * @param  {int}     symbol     The stock ticker symbol
 * @param  {int}     benchmark  The benchmark type ENUM
 * @param  {int}     period     The period type ENUM
 * @return {object}             Returns a promise
 */
Api.getMostRecommendedStocks = function getMostRecommendedStocks(benchmark, period) {
    benchmark  = benchmark  || Api.BenchmarkEnum.None;
    period     = period     || Api.PeriodEnum.OneYear;
    var deferred = Q.defer();
    get('/api/stocks/getMostRecommendedStocks/?benchmark=' + benchmark + '&period=' + period).then(function (data) {
        deferred.resolve(data.stocks);
    });
    return deferred.promise;
};

/**
 * Get most recommended sectors
 *
 * @param  {int}     symbol     The stock ticker symbol
 * @param  {int}     benchmark  The benchmark type ENUM
 * @param  {int}     period     The period type ENUM
 * @return {object}             Returns a promise
 */
Api.getMostRecommendedSectors = function getMostRecommendedSectors(benchmark, period) {
    benchmark  = benchmark  || Api.BenchmarkEnum.None;
    period     = period     || Api.PeriodEnum.OneYear;
    var deferred = Q.defer();
    get('/api/stocks/getMostRecommendedStocks/?benchmark=' + benchmark + '&period=' + period).then(function (data) {
        deferred.resolve(data.sectors);
    });
    return deferred.promise;
};

/**
 * Get top recommended stocks
 *
 * @param  {int}     n           Number of top stocks to get
 * @param  {int}     benchmark   The benchmark type ENUM
 * @param  {int}     expertType  The expert type ENUM
 * @param  {int}     period      The period type ENUM
 * @return {object}              Returns a promise
 */
Api.getTop = function getTop(n, benchmark, expertType, period) {
    benchmark  = benchmark  || Api.BenchmarkEnum.None;
    expertType = expertType || Api.ExpertTypeEnum.Analyst;
    period     = period     || Api.PeriodEnum.OneYear;
    return get('/api/experts/getTop/?benchmark=' + benchmark + '&experttype=' + expertType + '&period=' + period + '&top=' + n);
};

/**
 * Get top analysts
 *
 * @param  {int}     n          Number of top stocks to get
 * @param  {int}     benchmark  The benchmark type ENUM
 * @param  {int}     period     The period type ENUM
 * @return {object}             Returns a promise
 */
Api.getTopAnalysts = function getTopAnalysts(n, benchmark, period) {
    return Api.getTop(n, benchmark, Api.ExpertTypeEnum.Analyst, period);
};

/**
 * Get top analysts
 *
 * @param  {int}     n       Number of top stocks to get
 * @param  {int}     period  The period type ENUM
 * @return {object}          Returns a promise
 */
Api.getTopBloggers = function getTopBloggers(n, benchmark, period) {
    return Api.getTop(n, benchmark, Api.ExpertTypeEnum.Blogger, period);
};

/**
 * Get top insiders
 *
 * @param  {int}     n          Number of top stocks to get
 * @param  {int}     benchmark  The benchmark type ENUM
 * @param  {int}     period     The period type ENUM
 * @return {object}             Returns a promise
 */
Api.getTopInsiders = function getTopInsiders(n, benchmark, period) {
    return Api.getTop(n, benchmark, Api.ExpertTypeEnum.Insider, period);
};

/**
 * Get stock information by investor
 *
 * @param  {string}  name       The investor's name
 * @param  {int}     benchmark  The benchmark type ENUM
 * @param  {int}     period     The period type ENUM
 * @return {object}             Returns a promise
 */
Api.getStocks = function getStocks(name, benchmark, period) {
    name      = name.replace(/\s+/g, '-').toLowerCase();
    benchmark = benchmark  || Api.BenchmarkEnum.None;
    period    = period || Api.PeriodEnum.OneYear;
    return get('/api/experts/getStocks/?benchmark=' + benchmark + '&name=' + name + '&period=' + period);
};

/**
 * Gets newest submitted recommendations
 *
 * @param  {int}     n           Number of top stocks to get
 * @param  {int}     benchmark   The benchmark type ENUM
 * @param  {int}     expertType  The expert type ENUM
 * @param  {int}     period      The period type ENUM
 * @return {object}              Returns a promise
 */
Api.getLiveFeeds = function getLiveFeeds(n, benchmark, expertType, period) {
    benchmark  = benchmark  || Api.BenchmarkEnum.None;
    expertType = expertType || Api.ExpertTypeEnum.Analyst;
    period     = period || Api.PeriodEnum.OneYear;
    return get('/api/liveFeeds/getTop/?benchmark=' + benchmark + '&experttype=' + expertType + '&period=' + period + '&ranking=1&top=' + n);
};


module.exports = Api;