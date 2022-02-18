import React from 'react'
import Header from '../components/PageComponents/Header';

export const withHeader = (Component) => (props) => {
    return (
        <div>
            <Header/>
            <Component {...props} />
        </div>
    )
}