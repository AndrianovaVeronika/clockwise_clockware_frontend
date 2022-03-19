import React from 'react';
import gearsBackgroundImage from '../../../../static/gears-background-image.jpg';
import SignUpForm from "../../../Forms/SignUpForm";

const SignUpPage = () => {
    return (
        <div style={{display: 'flex', justifyContent: 'center', height: 'inherit'}}>
            <div style={{
                height: '100vh',
                width: '100vh',
                backgroundSize: 'contain',
                backgroundImage: `url(${gearsBackgroundImage})`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <SignUpForm signup={true}/>
            </div>
        </div>
    )
}

export default SignUpPage;