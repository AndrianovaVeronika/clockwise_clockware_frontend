import React from 'react'
import Sidebar from "../components/PageComponents/Sidebar";

export const withSidebar = (Component) => (props) => {
    return (
        <div style={{justifyItems: 'flex-start', width: '100%', marginTop: '50px'}}>
            <div style={{height: 'calc(100vh - 50px)'}}>
                <Sidebar/>
                <Component {...props} />
            </div>
        </div>
    )
}

export default withSidebar;