import React from 'react';
import gearsBackgroundImage from '../../../../static/gears-background-image.jpg';
import SignUpForm from "../../../Auth/SignUpForm";

const SignUpPage = () => {
    return (
        <div style={{justifyContent: 'center', width: '100%', height: '100vh'}}>
            <div style={{
                width: '100vh',
                height: '100vh',
                backgroundSize: 'contain',
                backgroundImage: `url(${gearsBackgroundImage})`,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <SignUpForm/>
            </div>
        </div>
    )
}

export default SignUpPage;