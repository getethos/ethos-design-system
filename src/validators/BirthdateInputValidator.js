"use strict";
exports.__esModule = true;
var getDayjs_js_1 = require("../helpers/getDayjs.js");
exports.DATE_FORMATS = ['mm/dd/yyyy', 'mm/yyyy', 'mm/yy'];
exports.dateMaskByFormat = {
    'mm/dd/yyyy': [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
    'mm/yyyy': [/\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
    'mm/yy': [/\d/, /\d/, '/', /\d/, /\d/]
};
exports.dateRegexByFormat = {
    'mm/dd/yyyy': /\d\d\/\d\d\/\d\d\d\d/,
    'mm/yyyy': /\d\d\/\d\d\d\d/,
    'mm/yy': /\d\d\/\d\d/
};
exports.dateStringMatchesFormat = function (cleansedDateString, dateFormat) {
    var pattern = exports.dateRegexByFormat[dateFormat];
    var matchesFormat = pattern.test(cleansedDateString);
    if (!matchesFormat) {
        return 'Please enter a valid date.';
    }
    return '';
};
exports.getMaxDateValidator = function (props) {
    var maxDate = props.maxDate, customErrorMessage = props.customErrorMessage, dateFormat = props.dateFormat;
    return function (value) {
        if (value == null || value === '')
            return '';
        var date = getDayjs_js_1["default"](maxDate);
        var dayjsFormat = dateFormat.toUpperCase();
        var errorMessage = customErrorMessage ||
            "Please enter a date before " + date.format(dayjsFormat);
        return getDayjs_js_1["default"](value).isBefore(date) ? '' : errorMessage;
    };
};
exports.getMinDateValidator = function (props) {
    var minDate = props.minDate, customErrorMessage = props.customErrorMessage, dateFormat = props.dateFormat;
    return function (value) {
        // Should pass if there is no value
        if (value == null || value === '')
            return '';
        var date = getDayjs_js_1["default"](minDate);
        var dayjsFormat = dateFormat.toUpperCase();
        var errorMessage = customErrorMessage ||
            "Please enter a date before " + date.format(dayjsFormat);
        return getDayjs_js_1["default"](value).isAfter(date) ? '' : errorMessage;
    };
};
exports.validateMinMaxDateFactory = function (props) {
    var minBirthdate = props.minBirthdate, maxBirthdate = props.maxBirthdate, minAge = props.minAge, maxAge = props.maxAge, dateFormat = props.dateFormat, customErrorMessage = props.customErrorMessage;
    return function (value) {
        var dateRangeErrorMessage = customErrorMessage || "Sorry, you must be " + minAge + "\u2013" + maxAge + ".";
        var maxError = exports.getMaxDateValidator({
            maxDate: maxBirthdate,
            customErrorMessage: dateRangeErrorMessage,
            dateFormat: dateFormat
        })(value);
        var minError = exports.getMinDateValidator({
            minDate: minBirthdate,
            customErrorMessage: dateRangeErrorMessage,
            dateFormat: dateFormat
        })(value);
        return minError.length || maxError.length ? dateRangeErrorMessage : '';
    };
};
