import React from 'react'
import Sidebar from "../components/PageComponents/Sidebar";

export const withSidebar = (Component) => (props) => {
    return (
        <div style={{display: 'flex', 'flex-flow': 'row nowrap', width: '100%'}}>
            <Sidebar/>
            <Component {...props} />
        </div>
    )
}

export default withSidebar;