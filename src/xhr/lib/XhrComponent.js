import React from 'react';
// @ts-ignore
import { InfoMessage } from '../../components/index';
import styles from './XhrComponent.module.css';
export function XhrComponent({ error = undefined, successMessage = undefined, displayErrorDetails = undefined, }) {
    /**
     * Print out error details if available.
     * User feedback is key!
     */
    const renderErrorDetails = (errorArg) => {
        if (Array.isArray(errorArg.details)) {
            return errorArg.details.map((detail, i) => {
                return (React.createElement("div", { key: i },
                    React.createElement("span", null,
                        detail.parameter,
                        ": "),
                    React.createElement("span", null, detail.error)));
            });
        }
        else {
            // @see https://stackoverflow.com/a/26199752
            const stringifiedError = JSON.stringify(errorArg, Object.getOwnPropertyNames(errorArg), 2);
            return React.createElement("pre", { className: styles.pre }, stringifiedError);
        }
    };
    if (error != null) {
        return (React.createElement(React.Fragment, null,
            React.createElement(InfoMessage.Alert.Error, null,
                React.createElement("div", null,
                    error.name,
                    " - ",
                    error.message),
                displayErrorDetails && React.createElement("div", null, renderErrorDetails(error)))));
    }
    else if (successMessage !== null) {
        return (React.createElement(React.Fragment, null,
            React.createElement(InfoMessage.Alert.Success, null,
                React.createElement("div", { className: "status" }, successMessage))));
    }
    else {
        return null;
    }
}
