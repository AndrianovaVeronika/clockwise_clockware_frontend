import React from 'react';
import {homePageText} from "../../../static/texts";
import vehicle from '../../../static/vehicle.png';
import {compose} from "redux";
import {withHeader} from "../../../functions/withHeader";

const HomePage = () => {
    return (
        <div style={{height: 'inherit', width: 'inherit', display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
            <div style={{width: '70%', display: 'flex', marginTop: '130px'}}>
                <div className='text'>{homePageText}</div>
                <div style={{
                    height: '450px',
                    width: '450px',
                    backgroundSize: 'cover',
                    backgroundImage: `url(${vehicle})`
                }}/>
            </div>
        </div>
    )
}

export default compose(withHeader)(HomePage);