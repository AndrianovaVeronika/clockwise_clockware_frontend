import React from 'react';
import './style.css';

const DefaultContent = (props) => {
    const content = props.content;
    
    return (
        <div className="page">
            <div className="content">
                {content}
            </div>
        </div>
    )
}

export default DefaultContent;