import React from 'react';
import { InfoMessage } from '../../components/index';
import styles from './XhrComponent.module.css';
export function XhrComponent({ error = null, successMessage = null, displayErrorDetails = null, }) {
    /**
     * Print out error details if available.
     * User feedback is key!
     */
    const renderErrorDetails = (errorArg) => {
        if (Array.isArray(errorArg.details)) {
            return errorArg.details.map((detail, i) => {
                return (<div key={i}>
            <span>{detail.parameter}: </span>
            <span>{detail.error}</span>
          </div>);
            });
        }
        else {
            // @see https://stackoverflow.com/a/26199752
            const stringifiedError = JSON.stringify(errorArg, Object.getOwnPropertyNames(errorArg), 2);
            return <pre className={styles.pre}>{stringifiedError}</pre>;
        }
    };
    if (error !== null) {
        return (<>
        <InfoMessage.Alert.Error>
          <div>
            {error.name} - {error.message}
          </div>
          {displayErrorDetails && <div>{renderErrorDetails(error)}</div>}
        </InfoMessage.Alert.Error>
      </>);
    }
    else if (successMessage !== null) {
        return (<>
        <InfoMessage.Alert.Success>
          <div className="status">{successMessage}</div>
        </InfoMessage.Alert.Success>
      </>);
    }
    else {
        return null;
    }
}
