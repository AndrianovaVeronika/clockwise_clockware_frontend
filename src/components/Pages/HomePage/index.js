import React from 'react';
import {withHeader} from '../../../functions/withHeader';
import {homePageText} from "../../../static/texts";
import {compose} from "redux";

const HomePage = () => {
    return (
        <div style={{height: 'inherit', width: 'inherit', display: 'flex', justifyContent: 'center'}}>
            <div className='text' style={{marginTop: '150px'}}>{homePageText}</div>
        </div>
    )
}

export default compose(withHeader)(HomePage);