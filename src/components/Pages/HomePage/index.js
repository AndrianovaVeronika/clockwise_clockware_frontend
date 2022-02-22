import React from 'react';
import {withHeader} from '../../../functions/withHeader';
import {homePageText} from "../../../static/texts";
import {compose} from "redux";

const HomePage = () => {
    return (
        <div className="text page">
            <div>{homePageText}</div>
        </div>
    )
}

export default compose(withHeader)(HomePage);