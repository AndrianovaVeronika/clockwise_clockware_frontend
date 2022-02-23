import React from 'react';
import gear from '../../../static/gear.png';
import gear2 from '../../../static/gear2.png';

const Spinner = () => {
    const speed = 5;
    const speed2 = 4;

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
            <div style={{height: '150px', marginTop: '30px'}}>
                <img style={{height: '100%', animation: `spin ${speed}s linear infinite`}} src={gear} alt="img"/>
            </div>
            <div style={{height: '110px', marginLeft: '-20px'}}>
                <img style={{height: '100%', animation: `spin ${speed2}s linear reverse infinite`}} src={gear2} alt="img"/>
            </div>
        </div>
    );
};

export default Spinner;