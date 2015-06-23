'use strict';


var sorts = {
    
    /**
     * Compares two key/value pairs and returns their sorting rank
     *
     * @param  {array}  Array key/value 1
     * @param  {array}  Array key/value 2
     * @return {int}    If 'a' is greater/less than or equal to 'b' in sort order
     */
    rank: function rankSort(a, b) {
        var nameA, nameB, countA, countB;
        nameA = a[0];
        nameB = b[0];
        countA = a[1];
        countB = b[1];
        if (countA > countB ) {
            return -1;
        } else if (countA === countB) {
            if (nameA > nameB) {
                return 1;
            } else if (nameA === nameB) {
                return 0;
            } else {
                return -1;
            }
        } else {
            return 1;
        }
    },
    
    /**
     * Sorts an array of objects by one of the object's properties
     *
     * @param  {string}  property  The property name of the object to sort by
     * @return {object}            The sort function
     */
    dynamic: function dynamicSort(property) {
        var sortOrder = 1;
        if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a, b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        };
    },
    
    /**
     * Sorts an object
     *
     * @param  {object}  obj  The object to sort
     * @return {object}       The sorted object
     */
    object: function objectSort(obj) {
        var o, result = {}, sortable = [];
        for (o in obj) {
            sortable.push([o, obj[o]]);
        }
        sortable.sort(sort.rank);
        sortable.forEach(function (v) {  
            result[v[0]] = v[1];
        });
        return result;
    }
};


module.exports = sorts;