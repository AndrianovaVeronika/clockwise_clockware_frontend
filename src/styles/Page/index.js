import React from 'react';
import {Box} from '@mui/material'
import useStyles from "../useStyles";

const Page = ({children}) => {
    const classes = useStyles();

    return (
        <Box className={classes.main}>
            {children}
        </Box>
    );
};

export default Page;