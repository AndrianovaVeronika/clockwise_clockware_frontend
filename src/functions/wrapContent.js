import React from 'react';
import DefaultContent from '../components/PageComponents/DefaultContent';

export const wrapContent = (Component) => (props) => {
    return (
        <DefaultContent
            content={
                <Component {...props} />
            }
        />
    )
}