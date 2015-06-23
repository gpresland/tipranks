/**
 * Tests for tipranksscraper.
 *
 *
 */

'use strict';

var tipranks = require('../lib/tipranks.js');
var fs = require('fs');

function save(filename, data) {
    fs.writeFile(filename, data, function(err) {
        if(err) {
            //
        } else {
            //
        }
    });
}

function runTest(options) {
    var header, result;
    header = '--------------------------------------------------\r\n' +
             'Test: ' + options.name + '\r\n' +
             'Expect: ' + options.expect + '\r\n' +
             'Result:';
    options = {
        name: options.name || 'N/A',
        expect: options.expect || 'N/A',
        method: options.method || function() {}
    };
    result = options.method();
    if (typeof result.then === 'function') {
        result.then(function (response) {
            console.log(header);
            console.dir(response);
            save(options.name + '.json', response);
        });
    } else {
        console.log(header);
        console.dir(result);
    }
}

//
// Test 1
//
runTest({
    name: 'Version',
    expect: 'x.x.x',
    method: tipranks.version
});


//
// Test 2
//
//runTest({
//    name: 'getData',
//    expect: 'json',
//    method: tipranks.getData('TWTR')
//});
tipranks.getData('TWTR').then(function (data) {
    console.dir(data);
});