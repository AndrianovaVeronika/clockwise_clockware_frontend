import React from 'react'
import MUICustomizedHeader from '../components/Header';

export const withHeader = (Component) => (props) => {
    return (
        <div>
            <MUICustomizedHeader />
            <Component {...props} />
        </div>
    )
}