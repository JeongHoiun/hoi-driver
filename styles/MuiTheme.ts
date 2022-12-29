import { createTheme } from '@mui/material/styles';

export const MuiTheme = createTheme({
    palette: {
        primary: {
            main: '#8388ff'
        },
        secondary: {
            main: '#ff8e88'
        }
    },
    components: {
        MuiButtonBase: {
            defaultProps: {
                disableRipple: true,
                disableTouchRipple: true
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    padding: '8px 16px'
                }
            }
        }
    }
});
