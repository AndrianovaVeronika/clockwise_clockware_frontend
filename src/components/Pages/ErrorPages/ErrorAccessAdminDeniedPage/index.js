import React from 'react';
import {Button, Paper, Typography} from "@mui/material";
import {useNavigate} from "react-router";
import gearsBackgroundImage from "../../../../static/gears-background-image.jpg";

const ErrorAccessAdminDeniedPage = () => {
    const navigate = useNavigate();

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
                <Paper
                    style={{
                        maxHeight: '200px',
                        maxWidth: '400px',
                        minHeight: '100px',
                        minWidth: '200px',
                        padding: '40px 30px',
                        margin: '10px auto',
                        flexDirection: 'column',
                    }}
                >
                    <Typography>You have no access</Typography>
                    <Button onClick={() => navigate('/')}>Return</Button>
                </Paper>
            </div>
        </div>
    )
}

export default ErrorAccessAdminDeniedPage;