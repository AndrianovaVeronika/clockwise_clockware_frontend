import React from 'react';
import {Button, Typography} from "@mui/material";
import {useNavigate} from "react-router";

const ErrorNotAdminPage = () => {
    const navigate = useNavigate();

    return (
        <div style={{display: 'flex', 'justify-content': 'center', 'flex-direction': 'column'}}>
            <Typography>You have no Access</Typography>
            <Button onClick={() => navigate('/')}>Return</Button>
        </div>
    )
}

export default ErrorNotAdminPage;