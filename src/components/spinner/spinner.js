import React, { useEffect } from 'react';
import Style from './spinner.module.css';

export const Spinner = ({isWhite = false}) => {

    return (
        <div className={`${Style.contianer} `}>
            <div className={`${Style.spinner} ${ isWhite ? Style.whiteborder :''}`}></div>
        </div>
    );
}
