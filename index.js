var api       = require('./lib/apis'),
    analytics = require('./lib/analytics');


var tipranks  = {};

tipranks.api = api;
tipranks.analytics = analytics;

module.exports = tipranks;