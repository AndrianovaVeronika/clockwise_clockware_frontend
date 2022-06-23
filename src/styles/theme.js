import {createTheme} from '@mui/material/styles';

const initialTheme = createTheme();
const theme = createTheme({
    palette: {
        primary: {
            main: '#000000'
        },
        secondary: {
            main: '#FFFFFF'
        }
    }
});


export default theme;