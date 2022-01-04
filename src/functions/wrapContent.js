import React from 'react';
import DefaultContent from '../components/DefaultContent';

export const wrapContent = (Component) => (props) => {
    return (
        <DefaultContent
            content={
                <Component {...props} />
            }
        />
    )
}