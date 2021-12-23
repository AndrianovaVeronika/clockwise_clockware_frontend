import React from 'react';
import './style.css';
import {withHeader} from '../../../functions/withHeader';
import {homePageText} from "../../../static/texts";

const HomePage = () => {
    return (
        <div className="homePage">
            <div className="content">
                <div className="text">{homePageText}</div>
            </div>
        </div>
    )
}

export default withHeader(HomePage);