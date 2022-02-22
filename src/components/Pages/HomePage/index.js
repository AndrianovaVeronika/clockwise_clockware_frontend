import React from 'react';
import {withHeader} from '../../../functions/withHeader';
import {homePageText} from "../../../static/texts";
import {compose} from "redux";

const HomePage = () => {
    return (
        <div style={{marginTop: '100px', justifyContent: 'center'}}>
            <div className='text'>{homePageText}</div>
        </div>
    )
}

export default compose(withHeader)(HomePage);