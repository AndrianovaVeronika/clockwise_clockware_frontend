import React from 'react'
import Sidebar from "../components/PageComponents/Sidebar";

export const withSidebar = (Component) => (props) => {
    return (
        <div style={{display: 'flex', justifyItems: 'flex-start', height: 'inherit'}}>
            <Sidebar/>
            <Component {...props} />
        </div>
    )
}

export default withSidebar;