"use strict";
exports.__esModule = true;
// Regex pulled from here: https://stackoverflow.com/a/46181
var validEmailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var EMAIL_FORMAT_ERROR_MESSAGE = 'Please enter a valid email.';
var EmailFormatValidator = function (email) {
    return validEmailRegex.test(email) ? '' : EMAIL_FORMAT_ERROR_MESSAGE;
};
exports["default"] = EmailFormatValidator;
